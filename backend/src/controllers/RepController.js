const api = require('axios');

module.exports = {

    async index(req, res) {
        try {
            const page = req.params["page"];
            const language = req.params["language"];

            const data = await api.get('https://api.github.com/search/repositories?q=language:'+language+'&order=desc&per_page=5&page='+page);

            const response = data.data["items"].map(item => {
                return {
                    "full_name" : item["full_name"],
                    "description" : item["description"],
                    "url" : item["html_url"],
                    "avatar_url" : item["owner"]["avatar_url"],
                    "stars_count" : item["stargazers_count"],
                }
            })
          
            return res.json(response);

        } catch (error) {
            console.error(error);
            //res.status(404).send("Oh uh, something went wrong");
            return res.status(404).json( {'message':'There is no match for your search.'} );
        }
    }
}