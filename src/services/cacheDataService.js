class CacheDataService {
  constructor() {
    this.userPosition = null;
    this.userPositionChoice = null;
  }

  static getInstance() {
    if (!CacheDataService.instance) {
      CacheDataService.instance = new CacheDataService();
    }
    return CacheDataService.instance;
  }
}

export default CacheDataService;
