import { Guild, GuildMember, Role } from 'discord.js';
import { KiwiClient } from '@/client';
import { Event, EventList } from '@/types/event';

import { getPersistConfig } from '../utils/getPersistConfig';
import { getUserPersistRoles } from '../utils/getUserPersistRoles';
import { hasRequiredRole } from '../utils/hasRequiredRole';
import { updateNickname } from '../utils/updateNickname';
import { addUserPersistRole } from '../utils/addUserPersistRole';
import { isPersistRole } from '../utils/isPersistRole';
import { PersistConfigEntity } from '@/entities/PersistConfig';

/**
 * @type {Event}
 */
export const GuildReady: Event = {
	name: EventList.GuildReady,

	/**
	 * @param {Guild} guild
	 */
	async getGuildId(guild: Guild) {
		return guild.id;
	},

	/**
	 * @param {KiwiClient} client
	 * @param {Guild} guild
	 */
	async execute(client: KiwiClient, guild: Guild) {
		var perConf = await getPersistConfig(client, guild.id);

		if (perConf?.persistRoles) {
			for (var role of perConf.persistRoles) {
				if (guild.roles.cache.has(role.roleId)) continue;

				await client.db.repos.persistUserRole.delete({
					guildId: guild.id,
					roleId: role.roleId,
				});

				await client.db.repos.persistConfigRole.delete({
					guildId: guild.id,
					roleId: role.roleId,
				});
			}
		}

		if (perConf?.requiredRoles) {
			for (var role of perConf.requiredRoles) {
				if (guild.roles.cache.has(role.roleId)) continue;
				await client.db.repos.persistConfigRequiredRole.delete({
					guildId: guild.id,
					roleId: role.roleId,
				});
			}
		}

		for (var member of (await guild.members.fetch()).values()) {
			if (member.user.bot) continue;
			await saveNewUserData(client, member, perConf);
			updateUser(client, member, perConf);
		}
	},
};

async function saveNewUserData(
	client: KiwiClient,
	member: GuildMember,
	perConf: PersistConfigEntity
) {
	var userNickName = await client.db.repos.persistNickname.findOneBy({
		guildId: member.guild.id,
		userId: member.id,
	});
	var userPersistRoles = await getUserPersistRoles(
		client,
		member.guild.id,
		member.id
	);

	if (
		userNickName?.nickName !== member.nickname &&
		perConf?.nicknames &&
		member.nickname
	) {
		updateNickname(client, member.guild.id, member.id, member.nickname);
	}

	for (let role of member.roles.cache.values()) {
		if (userPersistRoles.find((r) => r.roleId === role.id)) continue;
		if (!(await isPersistRole(client, member.guild.id, role.id))) continue;
		addUserPersistRole(client, member.guild.id, member.id, role.id);
	}
}

async function updateUser(
	client: KiwiClient,
	member: GuildMember,
	perConf: PersistConfigEntity
) {
	if (
		perConf.requiredRoles.length > 0 &&
		!hasRequiredRole(client, member.guild.id, member.id)
	) {
		return;
	}

	if (perConf?.nicknames) {
		var userNickName = await client.db.repos.persistNickname.findOneBy({
			guildId: member.guild.id,
			userId: member.id,
		});
		if (userNickName) {
			member.setNickname(userNickName.nickName).catch(() => {});
		}
	}

	var userPersistRoles = await getUserPersistRoles(
		client,
		member.guild.id,
		member.id
	);
	if (userPersistRoles.length === 0) return;
	for (var role of userPersistRoles) {
		if (perConf.persistRoles.find((r) => r.roleId === role.roleId)) {
			member.roles.add(role.roleId).catch(() => {});
		}
	}
}
