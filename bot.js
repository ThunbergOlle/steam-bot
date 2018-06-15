//-Modules & instances- (All modules/packages hould be installed with: npm install package-name)
//We require a file named config to retrive our account data from a file, instead of hardcoding it. (This file should be located in the samle folder as the bot.js)
const config = require('./config.json');
//Below is the required module steam-user, necessary to login onto Steam and simulate the Stean client. 
const SteamUser = require('steam-user');
//We require the steamcommunity module to access the Steam Community.
const SteamCommunity = require('steamcommunity');
//Another required module is steam-totp, 2FA being mandatory for trading fx. 
const SteamTotp = require('steam-totp');
//We use the SteamUser module to create an instance named 'client' with 'new SteamUser'.
const client = new SteamUser();
//We use the SteamCommunity module to create an instance named 'community' with 'new SteamCommunity'.
const community = new SteamCommunity();
//-Objects-
//With required modules and an instance, we can define our objects.
//The logOnOptions object is used to store the bots account name and password as 'keys' within the object.
const logOnOptions = {
  accountName: config.account.username, //Retrievs the accounts accountName stored in our config file.
  password: config.account.password, //Retrievs the accounts password stored in our config file.
  twoFactorCode: SteamTotp.generateAuthCode(config.account.sharedSecret) //Steam totp generates a 2FA code, using the accounts sharedSecret stored in our config file.
};
//-Methods-
//We pass the logOnOptions object as a parameter to the logOn method of our client.
client.logOn(logOnOptions);
//-Events-
//The 'on' method takes two parameters, an event name and a function.
//When the client emits an event called loggedOn, we cann use Node.js to log a custom message to our command prompt.
client.on('loggedOn', function(details) {
  console.log(client.steamID.getSteam3RenderedID() + ' Succesfully logged on to Steam!'); //Our custom message to log.
  client.setPersona(SteamUser.Steam.EPersonaState.LookingToTrade, config.bot.displayName); //The setPersona method takes two arguments, a EPersonaState (fx. LookingToTrade ), and a persona name (fx. Hoovy).
  client.gamesPlayed(config.bot.gamesPlayed); //The gamesPlayed method takes one argument, a Steam game appid or string. 
});
//When client emits a error event, we'll log that error to the console.
client.on('error', function(err) {
  //An error occurred during logon.
  console.log('Error: ' + err);
});
