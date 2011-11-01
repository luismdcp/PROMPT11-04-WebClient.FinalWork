function init() {
    var sendButton = document.getElementById('sendButton');
    sendButton.addEventListener("click", createMovieCard, false)

    var imageUrl = document.getElementById('imageUrl');
    imageUrl.addEventListener('change', handleUrlSelect, false);
}

window.onload = init;

function createMovieCard()
{
    var section = createSection();
    section.appendChild(createPoster());
    section.appendChild(createMetadata());

    document.getElementById("movies").appendChild(section);
}

function createSection()
{
    var section = document.createElement("section");
    section.setAttribute("class", "container");
    section.setAttribute("itemscope", "");
    section.setAttribute("itemtype", "http://schema.org/Movie");

    return section;
}

function createPoster()
{
    var imageUrl = document.getElementById('imageUrl');
    var titleInput = document.getElementById('title');
    var posterImgElement = document.createElement("img");

    posterImgElement.setAttribute("src", imageUrl.value);
    posterImgElement.setAttribute("alt", titleInput.value + " Poster");
    posterImgElement.setAttribute("itemprop", "image");

    var posterDiv = document.createElement("div");
    posterDiv.setAttribute("class", "poster");

    posterDiv.appendChild(posterImgElement);
    return posterDiv;
}

function createMetadata()
{
    var metadataDiv = document.createElement("div");
    metadataDiv.setAttribute("class", "metadata");

    metadataDiv.appendChild(createH4());
    metadataDiv.appendChild(createDurationRating());
    metadataDiv.appendChild(createCategories());
    metadataDiv.appendChild(createDirectorInfo());
    metadataDiv.appendChild(createActorsInfo());
    metadataDiv.appendChild(createAggregateRating());
    metadataDiv.appendChild(createDescription());

    return metadataDiv;
}

function createH4()
{
    var titleTextbox = document.getElementById('title');
    var h4 = document.createElement("h4");

    h4.setAttribute("itemprop", "name");
    h4.innerText = titleTextbox.value;

    return h4;
}

function createDurationRating()
{
    var durationInput = document.getElementById('duration');
    var contentRatingInput = document.getElementById('rating');

    var durationElement = document.createElement("time");
    durationElement.setAttribute("datetime", "PT103M");
    durationElement.setAttribute("itemprop", "duration");
    durationElement.innerText = durationInput.value + " min";

    var contentRatingElement = document.createElement("span");
    contentRatingElement.setAttribute("class", "contentRating");
    contentRatingElement.setAttribute("itemprop", "contentRating");
    contentRatingElement.innerText = contentRatingInput.value;

    var durationRatingDiv = document.createElement("div");
    durationRatingDiv.setAttribute("class", "durationRating");
    durationRatingDiv.appendChild(durationElement);
    durationRatingDiv.appendChild(contentRatingElement);

    return durationRatingDiv;
}

function createCategories()
{
    var categoriesDiv = document.createElement("div");
    categoriesDiv.setAttribute("class", "categories");

    var categoriesLabel = document.createElement("span");
    categoriesLabel.setAttribute("class", "label");
    categoriesLabel.innerText = "Categories:";
    categoriesDiv.appendChild(categoriesLabel);

    var categoriesListElement = document.getElementById('categories');
    var categoriesList = categoriesListElement.value;

    var splitCategories = categoriesList.split(",");

    for (var i = 0; i < splitCategories.length; i++)
    {
        var genreElement = document.createElement("span");
        genreElement.setAttribute("itemprop", "genre");
        genreElement.innerText = splitCategories[i];
        categoriesDiv.appendChild(genreElement);

        if (i !== splitCategories.length - 1)
        {
            var spaceAndBarElement = document.createTextNode(" |");
            categoriesDiv.appendChild(spaceAndBarElement);
        }
    }

    return categoriesDiv;
}

function createDirectorInfo()
{
    var directorInput = document.getElementById('director');

    var directorLabelElement = document.createElement("span");
    directorLabelElement.setAttribute("class", "label");
    directorLabelElement.innerText = "Director:";

    var directorElement = document.createElement("span");
    directorElement.setAttribute("itemprop", "Director");
    directorElement.innerText = directorInput.value;

    var directorInfoDiv = document.createElement("div");
    directorInfoDiv.setAttribute("class", "directorInfo");
    directorInfoDiv.setAttribute("itemscope", "");
    directorInfoDiv.setAttribute("itemtype", "http://schema.org/People");

    directorInfoDiv.appendChild(directorLabelElement);
    directorInfoDiv.appendChild(directorElement);

    return directorInfoDiv;
}

function createActorsInfo()
{
    var actorsDiv = document.createElement("div");
    actorsDiv.setAttribute("class", "actorsInfo");

    var actorsLabel = document.createElement("span");
    actorsLabel.setAttribute("class", "label");
    actorsLabel.innerText = "Actors:";
    actorsDiv.appendChild(actorsLabel);

    var actorsListElement = document.getElementById('actors');
    var actorsList = actorsListElement.value;

    var splitActors = actorsList.split(",");

    for (var i = 0; i < splitActors.length; i++)
    {
        var actorElement = document.createElement("span");
        actorElement.setAttribute("itemprop", "name");
        actorElement.innerText = splitActors[i];

        var actorDiv = document.createElement("div");
        actorDiv.setAttribute("itemprop", "actors");
        actorDiv.setAttribute("itemscope", "");
        actorDiv.setAttribute("itemtype", "http://schema.org/People");
        actorDiv.appendChild(actorElement);

        if (i !== splitActors.length - 1)
        {
            var commaElement = document.createTextNode(",");
            actorDiv.appendChild(commaElement);
        }

        actorsDiv.appendChild(actorDiv);
    }

    return actorsDiv;
}

function createAggregateRating()
{
    var ratingValueInput = document.getElementById('ratingStars');
    var ratingCountInput = document.getElementById('reviews');
    var reviewCountInput = document.getElementById('users');

    var aggregateRatingDiv = document.createElement("div");
    aggregateRatingDiv.setAttribute("class", "rating");
    aggregateRatingDiv.setAttribute("itemprop", "aggregateRating");
    aggregateRatingDiv.setAttribute("itemscope", "");
    aggregateRatingDiv.setAttribute("itemtype", "http://schema.org/AggregateRating");

    var ratingLabel = document.createElement("span");
    ratingLabel.setAttribute("class", "label");
    ratingLabel.innerText = "Rating:";
    aggregateRatingDiv.appendChild(ratingLabel);

    var ratingValue = document.createElement("span");
    ratingValue.setAttribute("itemprop", "ratingValue");
    ratingValue.innerText = ratingValueInput.value;
    aggregateRatingDiv.appendChild(ratingValue);

    var slash = document.createTextNode(" /");
    aggregateRatingDiv.appendChild(slash);

    var bestRating = document.createElement("span");
    bestRating.setAttribute("itemprop", "bestRating");
    bestRating.innerText = "10";
    aggregateRatingDiv.appendChild(bestRating);

    var starsFrom = document.createTextNode(" stars from");
    aggregateRatingDiv.appendChild(starsFrom);

    var ratingCount = document.createElement("span");
    ratingCount.setAttribute("itemprop", "ratingCount");
    ratingCount.innerText = ratingCountInput.value;
    aggregateRatingDiv.appendChild(ratingCount);

    var userReviews = document.createTextNode(" users. Reviews:");
    aggregateRatingDiv.appendChild(userReviews);

    var reviewCount = document.createElement("span");
    reviewCount.setAttribute("itemprop", "reviewCount");
    reviewCount.innerText = reviewCountInput.value;
    aggregateRatingDiv.appendChild(reviewCount);

    var dot = document.createTextNode(".");
    aggregateRatingDiv.appendChild(dot);

    return aggregateRatingDiv;
}

function createDescription()
{
    var descriptionInput = document.getElementById('description');

    var descriptionParagraph = document.createElement("p");
    descriptionParagraph.setAttribute("itemprop", "description");
    descriptionParagraph.innerText = descriptionInput.value;

    var descriptionDiv = document.createElement("div");
    descriptionDiv.setAttribute("class", "content");
    descriptionDiv.appendChild(descriptionParagraph);

    return descriptionDiv;
}

function handleUrlSelect()
{
    var posterImage = document.getElementById('posterImg');
    var imageUrl = document.getElementById('imageUrl');
    posterImage.src = imageUrl.value;
}