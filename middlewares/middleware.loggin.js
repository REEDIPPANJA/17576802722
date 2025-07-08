export const logClientInfo = (req, res, next) => {
  const clientInfo = {
    email: "panjareedip2002@gmail.com",
    name: "reedip panja",
    rollNo: "17576802722",
    accessCode: "VPpsmT",
    clientID: "2cf745ad-b697-4405-befb-c4f6d405ae2c",
    clientSecret: "KKYQXWgBfwQdSNMZ"
  };

  console.log("Client Info:", clientInfo);

  // Optionally attach to req if needed later
  req.clientInfo = clientInfo;

  // You can also return it in the response if required:
  // return res.json(clientInfo); // <- Uncomment this if you want to stop and send only the info

  next(); // Proceed to urlShortener
};
