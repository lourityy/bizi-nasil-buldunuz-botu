const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, SelectMenuBuilder } = require("discord.js");
module.exports = {
    name: "gönder",
    description: 'Bizi nerden buldunuz mesajını gönderir',
    type: 1,
    options: [],
    run: async (client, interaction) => {

        const noperm = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu yapabilmek için yeterli yetkiniz bulunmamakta.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [noperm], ephemeral: true })

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('a1')
                    .setPlaceholder('Bizi nasıl bulduğunu buradan seç!')
                    .addOptions([
                        {
                            label: "Youtube Videosundan Buldum",
                            emoji: "▶️",
                            value: "s_1"

                        },
                        {
                            label: "Sitenizden Buldum",
                            emoji: "🌐",
                            value: "s_2"

                        },
                        {
                            label: "Arkadaşım Davet Etti",
                            emoji: "👨",
                            value: "s_3"

                        },
                        {
                            label: "Bir Yerden Buldum İşte",
                            emoji: "🤷",
                            value: "s_4"

                        },
                    ])

            )

        const message_embed = new EmbedBuilder()
            .setColor("Blurple")
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTitle("Bizi Nasıl Buldunuz?")
            .setDescription(`> Sunucumuza hoşgeldiniz, bizi nasıl bulduğunuzu aşağıdaki menüye tıklayarak bildirirseniz seviniriz.\n\n> Seçiminizi yaptıktan sonra sunucuya **girişiniz otomatik yapılacaktır**.`)
            .setFooter({ text: "Bu altyapı discord.gg/altyapilar tarafından yapılmıştır.", iconURL: interaction.guild.iconURL() })

        try {
            interaction.reply({ content: "Mesaj başarıyla gönderildi!", ephemeral: true })
            return interaction.channel.send({ embeds: [message_embed], components: [row] })
        } catch {
            return interaction.reply({ content: "Mesaj gönderilirken bir hata oluştu!", ephemeral: true })
        }
    }
}