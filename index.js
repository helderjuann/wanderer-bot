require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} está online.`);

    client.user.setActivity({
      name: 'Digite !resina',
    })
});

client.on('messageCreate', (message) => {
    if (message.content === 'Wanderer') {
        message.reply('Oi, oi! Me chamou?');
    }
});

client.on('messageCreate', (message) => {
    if (message.content === 'Andarilho') {
        message.reply('E aí! Precisa de ajuda?');
    }
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!resina')) {
      const args = message.content.slice(8).trim().split(' ');
      const current_resin = parseInt(args[0]);
  
      if (isNaN(current_resin)) {
        message.reply("Digite a quantidade de resina atual, por favor");
        return;
      }
  
      if (current_resin > 160) {
        message.reply("A quantidade de resina não pode ser maior que 160");
        return;
      }
  
      if (current_resin < 0) {
        message.reply("Eita, tu tá com resina negativa é?!");
        return;
      }
  
      const max_resin = 160;
      const time_to_fill = 8;
      const resins_to_fill = max_resin - current_resin;
      const minutes_to_fill = resins_to_fill * time_to_fill;
      const now = new Date();
      const resin_fill_time = new Date(now.getTime() + minutes_to_fill * 60000);
      const resin_fill_time_string = `${resin_fill_time.toLocaleTimeString()}`;
      message.reply(`Sua resina ficará cheia às ${resin_fill_time_string}.`);
    }
  });

client.login(process.env.TOKEN); // Vai procurar o arquivo dotenv para pegar o TOKEN - Isso serve para caso você queira colocar um gitignore, assim você mantém sua informação pessoal segura. - Helder Juan 24/08
