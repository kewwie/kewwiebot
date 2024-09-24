import { Collection, MessageComponentInteraction } from "discord.js";
import { KiwiClient } from "./client";
import { SelectMenu, Button } from "./types/component";

export class ComponentManager {
    private client: KiwiClient;
    public SelectMenus: Collection<string, SelectMenu>;
    public Buttons: Collection<string, Button>;

    constructor(client: KiwiClient) {
        this.client = client;
        this.SelectMenus = new Collection();
        this.Buttons = new Collection();
    }

    public registerSelectMenu(selectMenu: SelectMenu) {
        var customId = selectMenu.customId;
        console.log(customId);
        this.SelectMenus.set(customId, selectMenu);
    }

    public registerButton(button: Button) {
        var customId = button.customId;
        this.Buttons.set(customId, button);
    }

    async onInteraction(interaction: MessageComponentInteraction) {

        if (interaction.isAnySelectMenu()) {
            var customId = interaction.customId.split("?")[0]
            let selectMenu = this.SelectMenus.get(customId);
            if (!selectMenu) return;

            var ownerId = interaction.customId = interaction.customId.split("+")[1];
            if (ownerId != interaction.user.id && ownerId != null) {
                interaction.reply({ content: "This isn't yours", ephemeral: true });
                return;
            };

            try {
                await selectMenu.execute(interaction, this.client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this select menu!', ephemeral: true });
            }
        } 
        else if (interaction.isButton()) {
            let customId = interaction.customId.split("?")[0];
            let button = this.Buttons.get(customId);
            if (!button) return;

            var ownerId = interaction.customId = interaction.customId.split("+")[1];
            if (ownerId != interaction.user.id && ownerId != null) {
                interaction.reply({ content: "This isn't yours", ephemeral: true });
                return;
            };

            try {
                await button.execute(interaction, this.client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
            }
        }
    }
};