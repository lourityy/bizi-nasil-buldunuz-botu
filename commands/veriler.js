const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, SelectMenuBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "veriler",
    description: 'Bizi nerden buldunuz verilerini gönderir',
    type: 1,
    options: [],
    run: async (client, interaction) => {

        const noperm = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu yapabilmek için yeterli yetkiniz bulunmamakta.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [noperm], ephemeral: true })

        const toplam = db.get(`toplam_${interaction.guild.id}`) || "0";

        const toplam_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Kimse seçim yapmamış, lütfen daha sonra tekrar deneyin.")

        if (!toplam || toplam === "0") return interaction.reply({ embeds: [toplam_embed], ephemeral: true })

        const s1 = db.get(`s1_${interaction.guild.id}`) || "0";
        const s2 = db.get(`s2_${interaction.guild.id}`) || "0";
        const s3 = db.get(`s3_${interaction.guild.id}`) || "0";
        const s4 = db.get(`s4_${interaction.guild.id}`) || "0";

        let veriler = [
            { label: `Youtube Videosu (${s1}/${toplam} kişi)`, value: s1 },
            { label: `Siteden (${s2}/${toplam} kişi)`, value: s2 },
            { label: `Arkadaş Daveti (${s3}/${toplam} kişi)`, value: s3 },
            { label: `Burada Olmayan Bir Yerden (${s4}/${toplam} kişi)`, value: s4 }
        ];
        veriler.sort(function (l, r) {
            return r.value - l.value;
        });

        const message_embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setTitle("Bizi Nasıl Buldunuz Verileri")
            .setDescription(`Aşağıdaki veriler **${toplam}** kişinin seçtiği alana göre **çoktan-aza** sıralanmıştır.`)
            .addFields(
                veriler.map((veri) => {
                    return { name: veri.label, value: `\`\`\`${veri.value}\`\`\`` }
                })
            )
            .setFooter({ text: "Bu altyapı discord.gg/altyapilar tarafından yapılmıştır.", iconURL: interaction.guild.iconURL() })
            .setThumbnail(interaction.guild.iconURL())

        try {
            return interaction.reply({ embeds: [message_embed], ephemeral: true })
        } catch {
            return interaction.reply({ content: "Mesaj gönderilirken bir hata oluştu!", ephemeral: true })
        }
    }
}
