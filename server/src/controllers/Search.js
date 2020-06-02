import UserModel from '../models/user_model'
import BusinessModel from '../models/business_model'
import ArticleModel from '../models/article_model'
import HubModel from '../models/hub_model'

require('dotenv').config()

const Search = {
  async searchData(req, res) {
    let searchResult = {
      people: [],
      companies: [],
      content: [],
      hubs: [],
      spaces: [],
    }

    const keywords = req.query.keywords
    const categories = req.query.categories

    // search in DB models
    let userResult = await Search.userSearch(keywords, categories).catch(
      err => {
        console.log(err)
        return
      }
    )
    let companiesResult = await Search.businessSearch(
      keywords,
      categories
    ).catch(err => {
      console.log(err)
      return
    })
    let articlesResult = await Search.articleSearch(keywords, categories).catch(
      err => {
        console.log(err)
        return
      }
    )
    let hubsResult = await Search.hubSearch(keywords, categories).catch(err => {
      console.log(err)
      return
    })
    // TODO: let spacesResult = await Search.spacesResult(keywords, categories);

    searchResult.people = userResult ? userResult.doc : []
    searchResult.companies = companiesResult ? companiesResult.doc : []
    searchResult.content = articlesResult ? articlesResult.doc : []
    searchResult.hubs = hubsResult ? hubsResult.doc : []
    // TODO: searchResult.spaces = spacesResult ? spacesResult.doc : []];

    return res.status(200).send(searchResult)
  },

  /**
   * This method performs Text Search on the UserModel Schema with
   * String of keywords separated by spaces
   * @param {String} keywords the keywords to perform Text Search on
   */
  async userSearch(keywords, categories) {
    let searchQuery = {}

    if (keywords) searchQuery = { $text: { $search: keywords } }
    else if (categories && !categories.toLowerCase().includes('people'))
      return null

    const queryRes = await UserModel.find(searchQuery, {
      score: { $meta: 'textScore' },
    })
      .select(
        '-password -linked_in_id -google_id -facebook_id -user_id -__v -user -password_hash -verification_secret -email_login_verified'
      )
      .sort({ score: { $meta: 'textScore' } })
      .catch(err => {
        console.log(err)
        return
      })

    return Search.createResultObj(queryRes)
  },

  /**
   * This method performs Text Search on the BusinessModel Schema with
   * String of keywords separated by spaces
   * @param {String} keywords the keywords to perform Text Search on
   */
  async businessSearch(keywords, categories) {
    let searchQuery = {}

    if (keywords) searchQuery = { $text: { $search: keywords } }
    else if (categories && !categories.toLowerCase().includes('companies'))
      return null

    const queryRes = await BusinessModel.find(searchQuery, {
      score: { $meta: 'textScore' },
    })
      .sort({ score: { $meta: 'textScore' } })
      .catch(err => {
        console.log(err)
        return
      })

    return Search.createResultObj(queryRes)
  },

  /**
   * This method performs Text Search on the ArticleModel Schema with
   * String of keywords separated by spaces
   * @param {String} keywords the keywords to perform Text Search on
   */
  async articleSearch(keywords, categories) {
    let searchQuery = {}

    if (keywords) searchQuery = { $text: { $search: keywords } }
    else if (categories && !categories.toLowerCase().includes('content'))
      return null

    const queryRes = await ArticleModel.find(searchQuery, {
      score: { $meta: 'textScore' },
    })
      .sort({ score: { $meta: 'textScore' } })
      .catch(err => {
        console.log(err)
        return
      })

    return Search.createResultObj(queryRes)
  },

  /**
   * This method performs Text Search on the HubModel Schema with
   * String of keywords separated by spaces
   * @param {String} keywords the keywords to perform Text Search on
   */
  async hubSearch(keywords, categories) {
    let searchQuery = {}

    if (keywords) searchQuery = { $text: { $search: keywords } }
    else if (categories && !categories.toLowerCase().includes('hubs'))
      return null

    const queryRes = await HubModel.find(searchQuery, {
      score: { $meta: 'textScore' },
    })
      .sort({ score: { $meta: 'textScore' } })
      .catch(err => {
        console.log(err)
        return
      })

    return Search.createResultObj(queryRes)
  },

  /**
   * used to create an object with error, status, doc attributes
   * @param {*} result result from .find() query
   */
  createResultObj(result) {
    let resultObj = {}
    if (result) {
      resultObj = {
        error: null,
        status: 200,
        doc: result,
      }
    } else {
      resultObj = {
        error: {
          err: 'An error occurred while searching.',
        },
        status: 500,
      }
    }
    return resultObj
  },
}

export default Search
