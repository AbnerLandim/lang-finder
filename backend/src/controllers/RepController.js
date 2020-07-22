const api = require('axios');
const { parse, stringify } = require('flatted');

module.exports = {

    async index(req, res) {
        try {
            const page = req.param("page");
            const language = req.param("language");

            const data = await api.get('https://api.github.com/search/repositories?q=language:'+language+'&order=desc&per_page=5&page='+page);

            const response = data.data["items"].map(item => {
                return {
                    "full_name" : item["full_name"],
                    "description" : item["description"],
                    "url" : item["html_url"],
                    "avatar_url" : item["owner"]["avatar_url"],
                    "created_at" : item["created_at"],
                    "updated_at" : item["updated_at"],
                }
            })
          
            return res.json(response);

        } catch (error) {
            console.error(error);
        }
    }
}