const client = require('../index.js') 

client.on("ready", async () => {
    
  /* Slash Commands */
	var slashCommands = client.slashCommands.map(x => x)
  await client.guilds.cache.get("GUILD_ID").commands.set(slashCommands);
    
   console.log(`${client.user.tag} - ✅️`);

});
