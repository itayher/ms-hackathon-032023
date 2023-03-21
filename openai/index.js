const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const messages = (req.body && req.body.messages);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: completion.data.choices[0].message
    };
}