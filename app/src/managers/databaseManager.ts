import { DataSource, FindOptionsWhere, Repository, DeepPartial } from "typeorm";
import { KiwiClient } from "@/client";

import { dataSource } from "@/datasource";

import { ActivityConfigEntity } from "@/entities/ActivityConfig";
import { ActivityMessageEntity } from "@/entities/ActivityMessage";
import { ActivityPresenceEntity } from "@/entities/ActivityPresence";
import { ActivityStatusEntity } from "@/entities/ActivityStatus";
import { ActivityVoiceEntity } from "@/entities/ActivityVoice";
import { ActivityVoicestateEntity } from "@/entities/ActivityVoicestate";
import { GuildModuleEntity } from "@/entities/GuildModule";
import { ListConfigEntity } from "@/entities/ListConfig";
import { PersistConfigEntity } from "@/entities/PersistConfig";
import { PersistConfigRequiredRoleEntity } from "@/entities/PersistConfigRequiredRole";
import { PersistConfigRoleEntity } from "@/entities/PersistConfigRole";
import { PersistNicknameEntity } from "@/entities/PersistNickname";
import { PersistUserRoleEntity } from "@/entities/PresistUserRole";
import { VerificationConfigEntity } from "@/entities/VerificationConfig";
import { VerificationConfigPingEntity } from "@/entities/VerificationConfigPing";
import { VerificationConfigRoleEntity } from "@/entities/VerificationConfigRole";
import { VerificationPendingMessageEntity } from "@/entities/VerificationPendingMessage";

export class DatabaseManager {
	public dataSource: DataSource;
	public client: KiwiClient;
	public repos: {
		activityConfig?: Repository<ActivityConfigEntity>;
		activityMessages?: Repository<ActivityMessageEntity>;
		activityPresence?: Repository<ActivityPresenceEntity>;
		activityStatus?: Repository<ActivityStatusEntity>;
		activityVoice?: Repository<ActivityVoiceEntity>;
		activityVoicestates?: Repository<ActivityVoicestateEntity>;
		guildModules?: Repository<GuildModuleEntity>;
		listConfig?: Repository<ListConfigEntity>;
		persistConfig?: Repository<PersistConfigEntity>;
		persistConfigRequiredRole?: Repository<PersistConfigRequiredRoleEntity>;
		persistConfigRole?: Repository<PersistConfigRoleEntity>;
		persistNickname?: Repository<PersistNicknameEntity>;
		persistUserRole?: Repository<PersistUserRoleEntity>;
		verificationConfig?: Repository<VerificationConfigEntity>;
		verificationConfigPing?: Repository<VerificationConfigPingEntity>;
		verificationConfigRole?: Repository<VerificationConfigRoleEntity>;
		verificationPendingMessage?: Repository<VerificationPendingMessageEntity>;
	};

	constructor(client: KiwiClient) {
		this.client = client;
		this.dataSource = dataSource;

		this.onCreate();
	}

	private async onCreate() {
		this.repos = {
			activityConfig: await this.dataSource.getRepository(ActivityConfigEntity),
			activityMessages: await this.dataSource.getRepository(ActivityMessageEntity),
			activityPresence: await this.dataSource.getRepository(ActivityPresenceEntity),
			activityStatus: await this.dataSource.getRepository(ActivityStatusEntity),
			activityVoice: await this.dataSource.getRepository(ActivityVoiceEntity),
			activityVoicestates: await this.dataSource.getRepository(ActivityVoicestateEntity),
			guildModules: await this.dataSource.getRepository(GuildModuleEntity),
			listConfig: await this.dataSource.getRepository(ListConfigEntity),
			persistConfig: await this.dataSource.getRepository(PersistConfigEntity),
			persistConfigRequiredRole: await this.dataSource.getRepository(
				PersistConfigRequiredRoleEntity
			),
			persistConfigRole: await this.dataSource.getRepository(PersistConfigRoleEntity),
			persistNickname: await this.dataSource.getRepository(PersistNicknameEntity),
			persistUserRole: await this.dataSource.getRepository(PersistUserRoleEntity),
			verificationConfig: await this.dataSource.getRepository(VerificationConfigEntity),
			verificationConfigPing: await this.dataSource.getRepository(
				VerificationConfigPingEntity
			),
			verificationConfigRole: await this.dataSource.getRepository(
				VerificationConfigRoleEntity
			),
			verificationPendingMessage: await this.dataSource.getRepository(
				VerificationPendingMessageEntity
			),
		};
	}

	public async generateConfigs(guildId: string) {
		var activityConfig = await this.repos.activityConfig.findOne({
			where: { guildId },
		});
		if (!activityConfig) {
			let actConf = new ActivityConfigEntity();
			actConf.guildId = guildId;
			await this.repos.activityConfig.save(actConf);
		}

		var listConfig = await this.repos.listConfig.findOne({
			where: { guildId },
		});
		if (!listConfig) {
			let listConf = new ListConfigEntity();
			listConf.guildId = guildId;
			await this.repos.listConfig.save(listConf);
		}

		var persistConfig = await this.repos.persistConfig.findOne({
			where: { guildId },
		});
		if (!persistConfig) {
			let perConf = new PersistConfigEntity();
			perConf.guildId = guildId;
			await this.repos.persistConfig.save(perConf);
		}

		var verificationConfig = await this.repos.verificationConfig.findOne({
			where: { guildId },
		});
		if (!verificationConfig) {
			let verConf = new VerificationConfigEntity();
			verConf.guildId = guildId;
			await this.repos.verificationConfig.save(verConf);
		}
	}

	public async isModuleEnabled(guildId: string, moduleId: string) {
		var moduleStatus = await this.repos.guildModules.findOneBy({
			guildId,
			moduleId,
		});
		if (moduleStatus) return true;
		return false;
	}

	public async getActivityConfig(guildId: string) {
		return await this.repos.activityConfig.findOne({ where: { guildId } });
	}

	public async getListConfig(guildId: string) {
		return await this.repos.listConfig.findOne({ where: { guildId } });
	}

	public async getPersistConfig(guildId: string) {
		return await this.repos.persistConfig.findOne({
			where: { guildId },
			relations: ["roles", "requiredRoles"],
		});
	}

	// Verification Database Functions

	public async getVerificationConfig(guildId: string) {
		return await this.repos.verificationConfig.findOne({
			where: { guildId },
			relations: ["pings", "roles"],
		});
	}

	public async createPendingMessage(options: DeepPartial<VerificationPendingMessageEntity>) {
		return await this.repos.verificationPendingMessage.insert(options);
	}

	public async getPendingMessage(
		options: FindOptionsWhere<VerificationPendingMessageEntity>
	): Promise<VerificationPendingMessageEntity> {
		return await this.repos.verificationPendingMessage.findOneBy({
			...options,
		});
	}

	public async getPendingMessages(
		options: FindOptionsWhere<VerificationPendingMessageEntity>
	): Promise<VerificationPendingMessageEntity[]> {
		return await this.repos.verificationPendingMessage.findBy({
			...options,
		});
	}

	public async deletePendingMessages(
		options: FindOptionsWhere<VerificationPendingMessageEntity>
	) {
		return await this.repos.verificationPendingMessage.delete(options);
	}
}
