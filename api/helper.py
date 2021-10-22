import nltk
import math
import string
from api.models import Passage, Topic


def parse_info(query):
    # Calculate IDF values across articles
    article_words = {}

    for topic in Topic.objects.all():
        article_words[topic.title] = []

        for passage in topic.passage_set.all():
            article_words[topic.title] += tokenize(passage.content)

    article_idfs = compute_idfs(article_words)

    # Tokenize query
    query = set(tokenize(query))

    # Determine top article matches according to TF-IDF
    articlename, article_rank = top_article(query, article_words, article_idfs)
    article = Topic.objects.get(title=articlename)

    # Extract sentences from top articles
    sentences = dict()
    for passage in article.passage_set.all():
        for sentence in nltk.sent_tokenize(passage.content):
            tokens = tokenize(sentence)
            if tokens:
                sentences[sentence] = tokens

    # Compute IDF values across sentences
    idfs = compute_idfs(sentences)

    # Determine top sentence matches
    answer, sentence_ranks = top_sentence(query, sentences, idfs)

    return {
        'tokens': query,
        'articleRanks': article_rank,
        'sentenceRanks': sentence_ranks,
    }


def tokenize(document):
    """
    Given a document (represented as a string), return a list of all of the
    words in that document, in order.

    Process document by coverting all words to lowercase, and removing any
    punctuation or English stopwords.
    """
    # nltk's word_tokenize function for tokenization
    words = nltk.word_tokenize(document)

    # Punctuations and stopwords
    punctuations = [x for x in string.punctuation]
    stopwords = nltk.corpus.stopwords.words("english").copy()

    # Lowercase all words
    words = [word.lower() for word in words]
    words = [word for word in words if word not in stopwords]
    words = [word for word in words if all(
        [ch not in punctuations for ch in word])]

    return words


def compute_idfs(documents):
    """
    Given a dictionary of `documents` that maps names of documents to a list
    of words, return a dictionary that maps words to their IDF values.

    Any word that appears in at least one of the documents should be in the
    resulting dictionary.
    """
    result = {}

    # Number of documents
    tnod = len(documents)

    for doc in documents:
        for word in set(documents[doc]):
            result[word] = result.get(word, 0) + 1

    # Map word with their idf values
    for word in result:
        result[word] = math.log(tnod / result[word])

    return result


def top_article(query, articles, idfs):
    """
    Given a `query` (a set of words), `articles` (a dictionary mapping names of
    articles to a list of their words), and `idfs` (a dictionary mapping words
    to their IDF values), return a list of the articlenames of the the `n` top
    articles that match the query, ranked according to tf-idf.
    """

    result = {article: 0 for article in articles}

    for article in articles:
        for word in query:
            result[article] += articles[article].count(
                word) * idfs.get(word, 0)

    ranks = [{"name": name, "rank": result[name]}
             for name in sorted(result, key=lambda x: result[x], reverse=True)]

    return ranks[0]['name'], ranks


def top_sentence(query, sentences, idfs):
    """
    Given a `query` (a set of words), `sentences` (a dictionary mapping
    sentences to a list of their words), and `idfs` (a dictionary mapping words
    to their IDF values), return a list of the `n` top sentences that match
    the query, ranked according to idf. If there are ties, preference should
    be given to sentences that have a higher query term density.
    """

    result = {sent: 0.0 for sent in sentences}
    qtd = {sent: 0.0 for sent in sentences}

    for sent in sentences:
        for word in query:
            if word in sentences[sent]:
                result[sent] += idfs[word]
                qtd[sent] += 1

        # Query Term Density
        qtd[sent] = qtd[sent] / len(sentences[sent])

    max_value = result[max([sent for sent in sentences],
                           key=lambda x: result[x])]

    # Determine top sentence matches
    result = {sent: [0.0, 0.0] for sent in sentences}

    for sent in sentences:
        for word in query:
            if word in sentences[sent]:
                result[sent][0] += idfs[word]
                result[sent][1] += 1

        # Query Term Density
        result[sent][1] = result[sent][1] / len(sentences[sent])

    sortedSentences = sorted(result, key=lambda x: result[x], reverse=True)
    return sortedSentences[0], [{'sent': sent, 'rank': result[sent][0], 'qtd': result[sent][1]} for sent in sortedSentences]
