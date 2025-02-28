import { KiwiClient } from '@/client';
import { Module } from './module';

export enum EventList {
	ApplicationCommandPermissionsUpdate = 'applicationCommandPermissionsUpdate',
	AutoModerationActionExecution = 'autoModerationActionExecution',
	AutoModerationRuleCreate = 'autoModerationRuleCreate',
	AutoModerationRuleDelete = 'autoModerationRuleDelete',
	AutoModerationRuleUpdate = 'autoModerationRuleUpdate',
	CacheSweep = 'cacheSweep',
	ChannelCreate = 'channelCreate',
	ChannelDelete = 'channelDelete',
	ChannelPinsUpdate = 'channelPinsUpdate',
	ChannelUpdate = 'channelUpdate',
	ClientReady = 'clientReady',
	Debug = 'debug',
	EntitlementCreate = 'entitlementCreate',
	EntitlementDelete = 'entitlementDelete',
	EntitlementUpdate = 'entitlementUpdate',
	Error = 'error',
	GuildAuditLogEntryCreate = 'guildAuditLogEntryCreate',
	GuildAvailable = 'guildAvailable',
	GuildBanAdd = 'guildBanAdd',
	GuildBanRemove = 'guildBanRemove',
	GuildCreate = 'guildCreate',
	GuildDelete = 'guildDelete',
	GuildEmojiCreate = 'emojiCreate',
	GuildEmojiDelete = 'emojiDelete',
	GuildEmojiUpdate = 'emojiUpdate',
	GuildIntegrationsUpdate = 'guildIntegrationsUpdate',
	GuildMemberAdd = 'guildMemberAdd',
	GuildMemberAvailable = 'guildMemberAvailable',
	GuildMemberRemove = 'guildMemberRemove',
	GuildMembersChunk = 'guildMembersChunk',
	GuildMemberUpdate = 'guildMemberUpdate',
	GuildReady = 'guildReady',
	GuildRoleCreate = 'roleCreate',
	GuildRoleDelete = 'roleDelete',
	GuildRoleUpdate = 'roleUpdate',
	GuildScheduledEventCreate = 'guildScheduledEventCreate',
	GuildScheduledEventDelete = 'guildScheduledEventDelete',
	GuildScheduledEventUpdate = 'guildScheduledEventUpdate',
	GuildScheduledEventUserAdd = 'guildScheduledEventUserAdd',
	GuildScheduledEventUserRemove = 'guildScheduledEventUserRemove',
	GuildStickerCreate = 'stickerCreate',
	GuildStickerDelete = 'stickerDelete',
	GuildStickerUpdate = 'stickerUpdate',
	GuildUnavailable = 'guildUnavailable',
	GuildUpdate = 'guildUpdate',
	InteractionCreate = 'interactionCreate',
	Invalidated = 'invalidated',
	InviteCreate = 'inviteCreate',
	InviteDelete = 'inviteDelete',
	MessageBulkDelete = 'messageDeleteBulk',
	MessageCreate = 'messageCreate',
	MessageDelete = 'messageDelete',
	MessagePollVoteAdd = 'messagePollVoteAdd',
	MessagePollVoteRemove = 'messagePollVoteRemove',
	MessageReactionAdd = 'messageReactionAdd',
	MessageReactionRemove = 'messageReactionRemove',
	MessageReactionRemoveAll = 'messageReactionRemoveAll',
	MessageReactionRemoveEmoji = 'messageReactionRemoveEmoji',
	MessageUpdate = 'messageUpdate',
	PresenceUpdate = 'presenceUpdate',
	Ready = 'ready',
	StageInstanceCreate = 'stageInstanceCreate',
	StageInstanceDelete = 'stageInstanceDelete',
	StageInstanceUpdate = 'stageInstanceUpdate',
	SubscriptionCreate = 'subscriptionCreate',
	SubscriptionDelete = 'subscriptionDelete',
	SubscriptionUpdate = 'subscriptionUpdate',
	ThreadCreate = 'threadCreate',
	ThreadDelete = 'threadDelete',
	ThreadListSync = 'threadListSync',
	ThreadMembersUpdate = 'threadMembersUpdate',
	ThreadMemberUpdate = 'threadMemberUpdate',
	ThreadUpdate = 'threadUpdate',
	TypingStart = 'typingStart',
	UserUpdate = 'userUpdate',
	VoiceChannelEffectSend = 'voiceChannelEffectSend',
	VoiceServerUpdate = 'voiceServerUpdate',
	VoiceStateUpdate = 'voiceStateUpdate',
	Warn = 'warn',
	WebhooksUpdate = 'webhooksUpdate',
}

export interface Event {
	module?: Module;
	name: string;
	global?: boolean;
	getGuildId?: (...args: any) => Promise<string>;
	execute: (client: KiwiClient, ...args: any) => void;
}
