import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import google from 'googlethis';

export default class MyPlugin extends Plugin {

	async onload() {
		this.registerMarkdownCodeBlockProcessor("menu", (source, el, ctx) => {
			console.log("Getting images")
			const images = google.image('The Wolf Among Us', { safe: false });
			console.log(images); 

			const rows = source.split("\n")
			.filter((row) => row.length > 0);

			let container = el.createEl("div", { cls: "menublock-container" });

			rows.forEach(function (value) {
				console.log("MENUS: " + value)
				let row = value.split(":");
				let completed = row[0] == "[x]"
				let mealDiv = container.createEl("div", { cls: "menublock" });

				if (completed) {
					mealDiv.classList.add("menublock-done");
				}

				let header = mealDiv.createEl("div", { text: row[1], cls: "menublock-header" })

				if (completed) {
					header.textContent += " ✅"
				}

				let content = mealDiv.createEl("div", { cls: "menublock-content" })

				content.createEl("div", { text: row[2], cls: "menublock-meal" })

				if (row.length >= 4) {
					content.createEl("div", { text: row[3], cls: "menublock-notes" })					
				}
			}); 

		});
	}

	onunload() {

	}
}