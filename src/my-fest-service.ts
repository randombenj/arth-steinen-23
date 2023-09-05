export interface ParticipationEntry {
  vorname: string
  name: string

  bonus: string
  datum: string,
  gast: boolean
  jury_nr: number
  jury_platz: string
  kategorie: string
  leiter: string
  platz_abk: string
  platz_name: string
  startnr: number
  verein: string
  vortrag: string
  zeit: string
  abgemeldet: boolean
}

export interface NameCategoryIndex {
  [key: string]: ParticipationEntry[]
}

const MyFestService = {

  /**
   * Removes a category from the local storage
   * @param category The category to remove
   */
  removeCategory: (category: NameCategoryIndex) => {
    const categories = MyFestService.getSavedCategories()
    for (const key in category) {
      delete categories[key]
    }
    localStorage.setItem("myFest", JSON.stringify(categories))
  },

  /**
   * Saves a new categorie to the local storage
   * @param categorie The categorie to add
   */
  saveCagegory: (category: NameCategoryIndex) => {
    const categories = MyFestService.getSavedCategories()
    for (const key in category) {
      categories[key] = category[key]
    }
    localStorage.setItem("myFest", JSON.stringify(categories))
  },


  /**
   * Gets all saved categories from the local storage
   */
  getSavedCategories: (): NameCategoryIndex => {
    const myFest = localStorage.getItem("myFest");
    if (myFest === null) {
      return {};
    }
    return JSON.parse(myFest) as NameCategoryIndex
  }
}

export default MyFestService;
