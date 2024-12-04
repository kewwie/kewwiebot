import { Module } from '@/types/module';

// Events
import { VoiceStateUpdate } from './events/voiceStateUpdate';
import { MessageCreate } from './events/messageCreate';

// Slash Commands
import { ActivitySlash } from './commands/activity';
//import { PresenceUpdate } from './events/presenceUpdate';
import { LeaderboardSlash } from './commands/leaderboard';

// Select Menus
import { ActivitySelectMenu } from './selectmenus/activityType';
import { LeaderboardTypeSelectMenu } from './selectmenus/leaderboardType';
import { LeaderboardTimeSelectMenu } from './selectmenus/leaderboardTime';

// Schedules
import { hourlySchedule } from './schedules/hourly';
import { dailySchedule } from './schedules/daily';
import { weeklySchedule } from './schedules/weekly';
import { monthlySchedule } from './schedules/monthly';

// Functions
import { createMessageLeaderboard } from './utils/createMessageLeaderboard';
import { createVoiceLeaderboard } from './utils/createVoiceLeaderboard';
import { getActivityConfig } from './utils/getActivityConfig';
import { getActivityPage } from './utils/getActivityPage';
import { getLeaderboardPage } from './utils/getLeaderboardPage';
import { getVoice } from './utils/getVoice';
import { getVoiceState } from './utils/getVoiceState';
import { grantMostActiveRole } from './utils/grantMostActiveRole';
import { removeVoiceState } from './utils/removeVoiceState';
import { saveVoice } from './utils/saveVoice';
import { createVoiceState } from './utils/createVoiceState';
import { updateVoiceState } from './utils/updateVoiceState';

export const ActivityModule: Module = {
	id: 'activity',
	events: [VoiceStateUpdate, MessageCreate],
	slashCommands: [ActivitySlash, LeaderboardSlash],
	selectMenus: [
		ActivitySelectMenu,
		LeaderboardTypeSelectMenu,
		LeaderboardTimeSelectMenu,
	],
	schedules: [hourlySchedule, dailySchedule, weeklySchedule, monthlySchedule],
	functions: {
		createMessageLeaderboard,
		createVoiceLeaderboard,
		getActivityConfig,
		getActivityPage,
		getLeaderboardPage,
		getVoice,
		getVoiceState,
		grantMostActiveRole,
		removeVoiceState,
		saveVoice,
		createVoiceState,
		updateVoiceState,
	},
};
