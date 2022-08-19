class User {
    constructor() {
        this.reset();
    }
    // 所持アイテム初期化
    setHashMap() {
        for (const item of itemList) this.itemHashMap[item[1]] = 0;
        this.itemHashMap["Flip machine"] = 1;
    }
    // 当該アイテムを1つ以上所持しているか
    hasItem(itemName) {
        if (this.itemHashMap[itemName] > 0) return true;
        return false;
    }
    // アイテム購入
    purchasingItem(item, amount, totalPrice) {
        this.itemHashMap[item[1]] += amount;
        if (item[1] === "Flip machine") increaseMoneyPerFlip(amount);
        else if (item[0] === "investment") item[2].updateItemInfo(amount);
        this.money -= totalPrice;
    }
    // 当該アイテムで1秒ごとに稼ぐ
    earnPerSec(item) {
        if (item[0] === "ability") return;
        const amount = this.itemHashMap[item[1]];
        if (item[0] === "investment") this.money += item[2].getInvestMoney();
        else this.money += item[3] * amount;
    }
    // ユーザー設定の初期化
    reset() {
        this.age = 20;
        this.days = 0;
        this.money = 50000;
        this.itemHashMap = {};
        this.setHashMap(); 
    }
}

// 名前空間として使用
class FlipMachine {
    static price = 15000;
    static MAX_PURCHASE = 100;
    static imgUrl = "https://im.indiatimes.in/media/content/2018/Mar/flippy_1520684925_725x725.jpg";
    static count = 0;
    static moneyPerClick = 25;
    
    
    // Flip をカウントし, 1 Flip の利益を取得
    static flip(user) {
        FlipMachine.count += user.itemHashMap["Flip machine"];
        return FlipMachine.moneyPerClick;
    }
    // 1 flip 毎の稼ぎを更新
    static increaseAmount(n) {
        FlipMachine.moneyPerClick += 25*n;
    }
    // 初期化
    static reset() {
        FlipMachine.moneyPerClick = 25;
        FlipMachine.count = 0;
        setNumOfBurger();
        setMoneyPerFlip();
    }
}

// 名前空間として使用
class ETF_Stock {
    static DEFAULT_PRICE = 300000;
    static price = ETF_Stock.DEFAULT_PRICE;
    static INTEREST_RATE = 0.001;
    static amountOfPrice = 0;
    static MAX_PURCHASE = Infinity;
    static imgUrl = "https://cdn.pixabay.com/photo/2020/08/10/14/37/business-5477997_960_720.png";
    
    // 販売価格と所持数(金額)を更新
    static updateItemInfo(amount) {
        ETF_Stock.price = ETF_Stock.getCurrentPrice(amount);
        ETF_Stock.amountOfPrice += ETF_Stock.getTotalPrice(amount);
    }
    // 現在の販売価格を取得
    static getCurrentPrice(amount) {
        let currPrice = ETF_Stock.price;
        for (let i=0; i < amount -1; i++) {
            currPrice += currPrice*0.1;
        }
        return Math.floor(currPrice);
    }
    // 購入数に応じた合計額を取得
    static getTotalPrice(amount) {
        let currPrice = ETF_Stock.price;
        let totalPrice = currPrice;
        for (let i=0; i < amount -1; i++) {
            currPrice += currPrice*0.1;
            totalPrice += Math.floor(currPrice);
        }
        return Math.floor(totalPrice);
    }
    // 1秒毎の利益を取得
    static getInvestMoney() {
        return ETF_Stock.amountOfPrice * ETF_Stock.INTEREST_RATE;
    }
    // 初期化
    static reset() {
        ETF_Stock.price = ETF_Stock.DEFAULT_PRICE;
        ETF_Stock.amountOfPrice = 0;
    }
}

// 名前空間として使用
class ETF_Bonds {
    static price = 300000;
    static INTEREST_RATE = 0.0007;
    static amountOfPrice = 0;
    static MAX_PURCHASE = Infinity;
    static imgUrl = "https://cdn.pixabay.com/photo/2020/08/10/14/37/business-5477997_960_720.png";

    // 所持数(金額)を更新
    static updateItemInfo(amount) {
        ETF_Bonds.amountOfPrice += ETF_Bonds.price * amount;
    }
    // 1秒毎の利益を取得
    static getInvestMoney() {
        return ETF_Bonds.amountOfPrice * ETF_Bonds.INTEREST_RATE;
    }
    // 初期化
    static reset() {
        ETF_Bonds.amountOfPrice = 0;
    }
}

// アイテム配列
const itemList = [
    ["ability", "Flip machine", FlipMachine],
    ["investment", "ETF Stock", ETF_Stock],
    ["investment", "ETF Bonds", ETF_Bonds],
    ["realEstate", "Lemonade Stand", 1000, 30, 30000, "https://images.pexels.com/photos/4619275/pexels-photo-4619275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    ["realEstate", "Ice Cream Truck", 500, 120, 100000, "https://images.pexels.com/photos/8350930/pexels-photo-8350930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    ["realEstate", "House", 100, 32000, 20000000, "https://cdn.pixabay.com/photo/2016/04/01/08/49/box-1299001_960_720.png"],
    ["realEstate", "TownHouse", 100, 64000, 40000000, "https://cdn.pixabay.com/photo/2013/07/12/13/56/cardboard-box-147606_960_720.png"],
    ["realEstate", "Mansion", 20, 500000, 250000000, "https://cdn.pixabay.com/photo/2013/07/12/13/56/cardboard-box-147607_960_720.png"],
    ["realEstate", "Industrial Space", 10, 2200000, 1000000000, "https://assets.mubicdn.net/images/film/75/image-w1280.jpg?1531855116"],
    ["realEstate", "Hotel Skyscraper", 5, 25000000, 10000000000, "https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    ["realEstate", "Bullet-Speed Sky Railway", 1, 30000000000, 10000000000000, "https://contents.trafficnews.jp/post_image/000/067/328/large_201020_thomas_01.jpg"],
];

//////// Game Function ////////
function getEle(id) { return document.getElementById(id); }
const config = {target: getEle("target")};

// アイテム設定を初期化
function resetItem() {
    FlipMachine.reset();
    ETF_Stock.reset();
    ETF_Bonds.reset();
}
// ゲームを始める
function playTheGame() {
    displayStartMenu();
    setEventToStartMenu();
}
// スタート画面表示
function displayStartMenu() {
    config.target.innerHTML = "";
    const container = document.createElement("div");
    container.id = "input-name";
    container.classList.add("d-flex", "align-items-center", "justify-content-center");
    container.innerHTML = `
        <div class="p-4 mb-4 d-flex flex-column align-items-center justify-content-center">
            <h2 class="mb-3">Clicker Empire Game</h2>
            <input id="name" class="col-10 mb-2" placeholder="Enter Your Name">
            <div class="d-flex justify-content-between col-10 p-0 mt-1">
                <button id="start-btn" class="col-5 btn">Start</button>
                <button id="continue-btn" class="col-5 btn">Continue</button>
            </div>
        </div>
    `;
    config.target.append(container);
}
// スタート画面にイベント設定（名前入力からのゲームスタート）
function setEventToStartMenu() {
    getEle("start-btn").addEventListener("click", function(){
        const name = getEle("name").value;
        if(!isValidName(name)) return;
        let user = new User();
        user.name = name;
        displayGame();
        setEventToGame(user);
    });

    getEle("continue-btn").addEventListener("click", function(){
        const name = getEle("name").value;
        if(!isValidName(name)) return;
        if(!localStorage.getItem(`data-${name}`)) {
            alert("There is no data.");
            return;
        }
        let user = new User();
        loadData(name, user);
        displayGame();
        setEventToGame(user);
    });
}
// 妥当な名前か判定する
function isValidName(name) {
    if (name.trim() == "") {
        alert("Enter Your Name, PLEASE");
        return false;
    }
    return true;
}

// ゲーム画面表示
function displayGame() {
    config.target.innerHTML = `
        <div id="main-wrapper" class="d-flex p-2 flex-column align-items-end col-12">
            <div id="fas-container" class="mr-1">
                <i id="reset" class="fas fa-redo mr-1"></i>
                <i id="save" class="fas fa-save"></i>
            </div>

            <div class="d-flex w-100 p-0">
                <div class="left col-5 p-0 m-0">
                    <div class="d-flex flex-column py-2 info">
                        <div class="d-flex justify-content-center align-items-center"><p id="hamburger-count" class="py-2"></p></div>
                        <div class="d-flex justify-content-center align-items-center"><p id="per-click" class="py-2"><p></div>
                    </div>
                    <div class="d-flex align-items-center px-2 vh">
                        <div><img id="burger-img" class="img-fluid" src="https://mitok.info/wp-content/uploads/2020/12/20201205s1-01.jpg"></div>
                    </div>
                </div>

                <div class="right col-7 p-0">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-wrap py-2 info">
                            <div class="col-6 d-flex justify-content-center align-items-center py-2"><p id="user-name"></p></div>
                            <div class="col-6 d-flex justify-content-center align-items-center py-2"><p id="user-age"></div>
                            <div class="col-6 d-flex justify-content-center align-items-center py-2"><p id="user-days"></p></div>
                            <div class="col-6 d-flex justify-content-center align-items-center py-2"><p id="user-money"></p></div>
                        </div>
                        <div id="item-container" class="pt-2 d-flex flex-column"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// ゲーム画面にイベント追加(タイマー, フリップ, リセット, セーブ)
function setEventToGame(user) {
    setData(user);
    setMoneyPerFlip();
    setNumOfBurger();
    let i = 0;
    let game = setInterval(function(){
        for (const item of itemList) {
            if (user.hasItem(item[1])) user.earnPerSec(item);
        }
        updateUserInfo(user);
        i++;
    },1000);

    getEle("burger-img").addEventListener("click", function(){
        flipBurger(user);
    });

    getEle("reset").addEventListener("click",  function(){
        if(confirm("Reset All Data?")) {
            user.reset();
            resetItem();
            setData(user);
            i = 0;
        }
    });
    
    getEle("save").addEventListener("click",  function(){
        if(confirm("Save your data?")) {
        clearInterval(game);
        saveData(user);
        resetItem();
        playTheGame();
        }
    });
}

// アイテム一覧ページ作成とユーザー情報の反映
function setData(user) {
    setItemContainer(user);
    getEle("user-name").innerHTML = user.name;
    setUserMoney(user);
    setUserInfo(user);
}

//// User 情報に関する Function ////
// 所持金をHTMLに反映
function setUserMoney(user){
    getEle("user-money").innerHTML = "￥" + user.money.toLocaleString();
}
// 所持金、年齢、経過日数をHTMLに反映
function setUserInfo(user){
    getEle("user-age").innerHTML = `<span class="fs-1dot5em">${user.age}</span> yrs old`;
    getEle("user-days").innerHTML = `Day <span class="fs-1dot5em">${user.days.toLocaleString()}</span>`;
}
// 日数と年齢を更新
function updateUserInfo(user){
    user.days ++;
    if (user.days % 365 == 0) user.age ++;
    setUserMoney(user);
    setUserInfo(user);
}

//// Burger Flip Function ////
// 1 flip毎の稼ぎを更新し、htmlに反映
function increaseMoneyPerFlip(n) {
    FlipMachine.increaseAmount(n);
    setMoneyPerFlip();
}
// 1 flip毎の稼ぎをhtmlに反映(￥ ~ per click)
function setMoneyPerFlip() {
    getEle("per-click").innerHTML = `￥${FlipMachine.moneyPerClick.toLocaleString()} per click`;
}
// flipで稼ぎ、flipカウントとuser.moneyをhtmlに反映
function flipBurger(user) {
    if(user.hasItem("Flip machine")) {
        user.money += FlipMachine.flip(user);
        setNumOfBurger();
        setUserMoney(user);
    }
}
// flipカウントをhtmlに反映(~ Burgers)
function setNumOfBurger() {
    getEle("hamburger-count").innerHTML = `<span class="fs-2em">${FlipMachine.count}</span> Burgers`;
}

//// アイテム全般に関する Function ////
// 価格を取得
function getPrice(item) {
    if (item[0] == "realEstate") return item[4];
    return item[2].price;
}
// アイテム画像のURLを取得
function getImg(item) {
    if (item[0] == "realEstate") return item[5];
    return item[2].imgUrl;
}
// 最大購入数を取得
function getMaxPurchase(item) {
    if (item[0] == "realEstate") return item[2];
    return item[2].MAX_PURCHASE;
}
// input タグ内のmax属性に反映させる最大購入数を取得(Infinity を無視)
function setInputMaxPurchase(item, user) {
    const maxPurchase = getMaxPurchase(item) - user.itemHashMap[item[1]];
    if (maxPurchase !== Infinity) return maxPurchase;
}
// 個別ページに反映させる最大購入数を取得("∞" 表示に対応)
function getMaxPurchaseString(item) {
    const maxPurchase = getMaxPurchase(item);
    if (maxPurchase === Infinity) return "∞";
    return String(maxPurchase);
}
// アイテム一覧に反映させる簡単な説明文を取得
function getShortDescription(item) {
    if (item[0] == "realEstate") return `￥${item[3].toLocaleString()} / sec`;
    else if(item[0] == "investment") return `￥${(item[2].INTEREST_RATE * 100).toLocaleString()}% / sec`;
    else if (item[1] == "Flip machine") return `￥${item[2].moneyPerClick.toLocaleString()} / click`;
    return;
}
// 個別ページに反映させる説明文を取得
function getDescription(item) {
    if (item[0] == "realEstate") return `Get ${item[3].toLocaleString()} extra yen per second`;
    else if(item[0] == "investment") return `Get ${(item[2].INTEREST_RATE * 100).toLocaleString()}% extra yen per second`;
    else if (item[1] == "Flip machine") return `Get ${item[2].moneyPerClick.toLocaleString()} extra yen per click`;
    return;
}
// アイテムリストの追加、HTML反映
function setItemContainer(user) {
    getEle("item-container").innerHTML = "";
    const container = document.createElement("div");
    for (const item of itemList) {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="d-flex m-2 mt-0 item w-100">
                <div class="col-3 p-0">
                    <img src="${getImg(item)}" class="img-fluid">
                </div>
                <div class="col-9 d-flex flex-column justify-content-center">
                    <div class="d-flex justify-content-between align-items-baseline">
                        <h4>${item[1]}</h4>
                        <p class="pos-num">${user.itemHashMap[item[1]].toLocaleString()}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>￥${getPrice(item).toLocaleString()}</p>
                        <p class="sd">${getShortDescription(item)}</p>
                    </div>
                </div>
            </div>
        `;
        setEventToItemDiv(div, item, user);
        container.append(div);
    }
    getEle("item-container").append(container);
}
// 個々のアイテムdivにイベントを設定
function setEventToItemDiv(ele, item, user){
    ele.addEventListener("click", function(){
        getEle("item-container").innerHTML = "";
        const container = setItemPage(item, user);
        getEle("item-container").append(container);
        setEventToInput(container, item, user);
        setEventToBackNextBtns(container, item, user);
    });
}
// アイテムの購入ページを作成
function setItemPage(item, user) {
    const container = document.createElement("div");
    getEle("item-container").classList.add("justify-content-center");
    container.innerHTML = `
        <div class="p-3">
            <div class="d-flex p-0 mb-2">
                <div class="col-8 p-0">
                    <h4>${item[1]}</h4>
                    <p>Max Purchases: ${getMaxPurchaseString(item).toLocaleString()}</p>
                    <p>Price: ￥${getPrice(item).toLocaleString()}</p>
                    <p>${getDescription(item)}</p>
                </div>
                <div class="col-4 p-0">
                    <img src="${getImg(item)}" class="img-fluid">
                </div>
            </div>
            <div>
                <label for="amount" class="fontSize">How Many would you like to Purchase?</label>
                <input id="amount" type="number" max="${setInputMaxPurchase(item, user)}" class="w-100 ta-right">
            </div>
            <div class="mt-2 mb-4 mr-2 ta-right"><h5 id="total-price">total: ￥0</5></div>
            <div class="d-flex justify-content-between col-12 p-0">
                <button id="backBtn" class="button col mr-2">Go Back</button>
                <button id="nextBtn" class="button col">Purchase</button>
            </div>
        </div>
    `;
    return container;
}
// インプットにイベントを設定
function setEventToInput(ele, item, user) {
    const totalPriceDiv = ele.querySelectorAll("#total-price")[0];
    const amountDiv = ele.querySelectorAll("#amount")[0];
    let amount = Number(amountDiv.value);
    let totalPrice = getTotalPrice(amount, item);
    amountDiv.addEventListener("change", function(){
        amount = Number(amountDiv.value);
        if (amount > 0 && amount <= getMaxPurchase(item) - user.itemHashMap[item[1]]) {
            totalPrice = getTotalPrice(amount, item);
        }
        else {
            amountDiv.value = "0";
            totalPrice = 0;
        }
        totalPriceDiv.innerHTML = "￥" + totalPrice.toLocaleString();
    });
}
// 戻る&購入ボタンにイベントを設定
function setEventToBackNextBtns(ele, item, user) {
    const backBtn = ele.querySelectorAll("#backBtn")[0];
    backBtn.addEventListener("click", function(){
        backToItemList(user);
    });

    const nextBtn = ele.querySelectorAll("#nextBtn")[0];
    nextBtn.addEventListener("click", function(){
        const amount = Number(ele.querySelectorAll("#amount")[0].value);
        const currMaxPurchase = getMaxPurchase(item) - user.itemHashMap[item[1]];
        console.log(currMaxPurchase);
        if (currMaxPurchase === 0) {
            alert("You cannot purchase this anymore.");
            return;
        }
        const totalPrice = getTotalPrice(amount, item);
        if (user.money < totalPrice) alert("You don't have enough money.");
        else if(totalPrice == 0) alert("Select at least 1.");
        else {
            user.purchasingItem(item, amount, totalPrice);
            backToItemList(user);
        }
    });
}
// 所持金を更新し、アイテム一覧ページに戻る
function backToItemList(user) {
    setUserMoney(user);
    setItemContainer(user);
    getEle("item-container").classList.remove("justify-content-center");
}
// 購入数に応じた合計金額を取得
function getTotalPrice(amount, item) {
    if (item[1] === "ETF Stock") {
        return ETF_Stock.getTotalPrice(amount);
    }
    return amount * getPrice(item);
}

//// データ保存 & 読み込み ////
// データ保存
function saveData(user) {
    const jsonString = `{
        "name":"${user.name}",
        "age":${user.age},
        "days":${user.days},
        "money":${user.money},
        "itemHashMap":{${getArrayOfItemHashMap(user)}},
        "burgerCount":${FlipMachine.count}
    }`;
    localStorage.setItem(`data-${user.name}`, jsonString);
    alert("Saved your data. Please put the same name when you continue the game.");
}
// user.itemHashMap をJSON 文字列に変換して取得
function getArrayOfItemHashMap(user) {
    arr = [];
    for (const k in user.itemHashMap) {
        arr.push(`"${k}":${user.itemHashMap[k]}`);
    }
    return arr.join(",");
}
// データ読み込み
function loadData(name, user) {
    const data = localStorage.getItem(`data-${name}`);
    let jsonDecorded = JSON.parse(data);

    user.name = jsonDecorded.name;
    user.age = jsonDecorded.age;
    user.days = jsonDecorded.days;
    user.money = jsonDecorded.money;
    user.itemHashMap = jsonDecorded.itemHashMap;
    FlipMachine.count = jsonDecorded.burgerCount;
    FlipMachine.moneyPerClick = user.itemHashMap["Flip machine"] * 25;
}

//////// Game ////////
playTheGame();