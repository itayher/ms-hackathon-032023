const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async function (context, req) {
    try{
        context.log('JavaScript HTTP trigger function processed a request.');

        const prompt = (req.body && req.body.content);

        let params = JSON.parse(process.env.OPENAI_OFFENSIVE_PARAMETERS);
        console.log(params);
        params.prompt = prompt;

        //{\"model\": \"text-davinci-003\",\"max_tokens\": 10,\"temperature\": 0.1,\"top_p\": 1,\"n\": 1,\"stream\": false,\"logprobs\": null,\"stop\": \"\\n\"}
        const ai = await openai.createCompletion(params);

        console.log(ai.data);
        const aiResult = (ai.data.choices[0].text.toLocaleLowerCase().indexOf("yes") > -1);
        const justification = aiResult ? "this is the offensive text: bla bla" : ""
        
        let res = {"result": aiResult, "justification": justification};

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: res
        };
    }  catch (e) {
        context.res = {
            status: 500,
            body: {"error": e}
        }
    }
}

