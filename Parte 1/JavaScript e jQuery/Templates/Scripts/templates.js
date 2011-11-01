/// <reference path="jquery-1.6.4.min.js" />

$(function () {
    var movie = { title: "Shrek", image: "http://ia.media-imdb.com/images/M/MV5BMzk2MzYwOTY0N15BMl5BanBnXkFtZTcwOTg4NDUxMQ@@._V1._SY317_CR5,0,214,317_.jpg",
        sinopse: "An ogre, in order to regain his swamp, travels along with an annoying donkey in order to bring a princess to a scheming lord, wishing himself King.Lorem ipsum ...", 
        actor: { name: "Eddie Murphy" }
    };

    var otherMovie = { title: "Puss in the Boots", image: "http://ia.media-imdb.com/images/M/MV5BMTMxMTU5MTY4MV5BMl5BanBnXkFtZTcwNzgyNjg2NQ@@._V1._SY317_.jpg",
        sinopse: "A story about the events leading up to the sword fighting cat's meeting with Shrek and his friends.", 
        actor: { name: "Antonio Banderas" }
    };

    var testeComputacaoParcial = partialTemplate("movieTemplate")(movie, otherMovie);
    
    // Array para o exemplo de criação de um array de templates
    var htmlMovies = template("movieTemplate", [movie, otherMovie]);
    //var htmlMovie = template("movieTemplate", movie);
    
    //$("#movieArea").html(htmlMovie);
    // geração de HTML para o array de movies
    $("#movieArea").html(htmlMovies.join(""));

    function template(templateName, movieObject) {
        var templateScriptHtml = $("#" + templateName)[0].innerHTML;

        if (movieObject instanceof Array) {
            var templateArray = [];

            for (var i = 0; i < movieObject.length; i++) {
                templateArray.push(processMovie(movieObject[i], templateScriptHtml));
            }

            return templateArray;
        }
        else {
            return processMovie(movieObject, templateScriptHtml);
        }
    }

    function processMovie(movieObject, templateHtml) {
        var templateHtmlBuffer = templateHtml;

        for (var key in movieObject) {
            if (movieObject.hasOwnProperty(key)) {
                var propertyValue = movieObject[key];

                if (typeof propertyValue === 'object') {
                    for (var subKey in propertyValue) {
                        if (propertyValue.hasOwnProperty(subKey)) {
                            var subPropertyValue = propertyValue[subKey];

                            templateHtmlBuffer = findAndReplace(key + '.' + subKey, subPropertyValue, templateHtmlBuffer);
                        }
                    }
                }
                else {
                    templateHtmlBuffer = findAndReplace(key, propertyValue, templateHtmlBuffer);
                }
            }
        }

        return templateHtmlBuffer;
    }

    function findAndReplace(searchText, replacementText, sourceHtml) {
        if (typeof searchText !== 'string' || typeof replacementText !== 'string' || typeof sourceHtml !== 'string') {
            return;
        }

        return sourceHtml.replace('$(' + searchText + ')', replacementText);
    }

    function partialTemplate(templateName) {
        var templateScriptHtml = $("#" + templateName)[0].innerHTML;
        var result = [];

        return function innerTemplate() {
            for (var i = 0; i < arguments.length; i++) {
                result.push(processMovie(arguments[i], templateScriptHtml));
            }

            return result;
        };
    }
});