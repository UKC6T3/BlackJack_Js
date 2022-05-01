const big_cards=["A","K","Q","J"];
var dealer_Ace=0;
var player_Ace=0;
var canHit=true;

var dealer_sum=0
var player_sum=0

var start_dealer_cards;
var start_player_cards;
var hit_player_card;
var hidden;
var deck;

window.onload = function(){
    createDeck()
    shuffleDeck()
    start_Game()
    }

function createDeck(){
    deck=[];
    const suits=["C", "D", "H", "S"];
    const value=["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
    for(let i=0;i< suits.length;i++){
        for(let j= 0 ; j< value.length;j++){
            deck.push(value[j]+"-"+suits[i])
        }
    }
}

function shuffleDeck(){
    for(let i = 0 ; i < deck.length ; i++){
        let j = Math.floor(Math.random() * 52 );
        let trade = deck[i];
        deck[i] = deck[j];
        deck[j] = trade;
    }
}

function start_Game(){
    let i   =  0;
    while(  i !==  2 ){
        if( i   === 1   )
        {
        let counts;
        start_player_cards=deck.pop();
        player_Ace  +=  checkAce    (start_player_cards);
        player_sum  +=  cardValue   (start_player_cards);
        counts=reduceAce(player_sum,player_Ace);
        player_Ace=counts[1];
        player_sum=counts[0];
        putTheCards(start_player_cards  ,   "player");

        hidden=deck.pop();        
        dealer_Ace  +=  checkAce    (hidden);
        dealer_sum  +=  cardValue   (hidden);
        counts=reduceAce(dealer_sum,dealer_Ace);
        dealer_Ace=counts[1];
        dealer_sum=counts[0];
        putHiddenCard();
        }
        else
        {
        start_player_cards=deck.pop();
        player_Ace  +=  checkAce    (start_player_cards);
        player_sum  +=  cardValue   (start_player_cards);
        putTheCards(start_player_cards  ,   "player");

        start_dealer_cards=deck.pop();        
        dealer_Ace  +=  checkAce    (start_dealer_cards);
        dealer_sum  +=  cardValue   (start_dealer_cards);
        putTheCards(start_dealer_cards  ,   "dealer");

        }
        i++;
    }
    
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("player-sum").innerText = player_sum;
}

function cardValue(card){
    let split = card.split  ("-");
    let value = split   [0] ;
    if( big_cards.includes(value)    ){
        if(value    === "A"){
            return 11;
        }
        return 10;
    }

    return parseInt(value)
}

function putTheCards(card,who){

    let cardImg =document.createElement("img")
    cardImg.src = "./cards/" + card + ".png";

    if(who==="dealer")
    {
    document.getElementById("dealer-cards").append(cardImg);
    }
    else
    {
    document.getElementById("player-cards").append(cardImg);
    }
}

function putHiddenCard(){
    let cardImg = document.createElement("img");
    cardImg.src = "./cards/BACK.png";
    document.getElementById("dealer-cards").append(cardImg);
}


function hit(){
    if(!canHit){
        return
    }
    hit_player_card =   deck.pop();
    putTheCards(hit_player_card,"player")

    player_Ace+=checkAce(hit_player_card)
    player_sum+=cardValue(hit_player_card)
    let counts=reduceAce(player_sum,player_Ace)
    player_Ace=counts[1]
    player_sum=counts[0]

    
    document.getElementById("player-sum").innerText = player_sum;
    
    if(player_sum >= 21)
    {
        canHit =false;
        dealerDraw();
        return;
    }
}

function checkAce(card){
    return card[0]==="A"? 1 : 0;
}

function reduceAce(Sum,Aces){
    if(Sum   >   21 && Aces    > 0){
        Sum  -=  10;
        Aces -=1;
    }
    return [Sum,Aces];
}

function dealerDraw(){
    const dealer = document.getElementById("dealer-cards");
    dealer.removeChild(dealer.lastElementChild)
    putTheCards(hidden,"dealer")

    while(dealer_sum<=17)
    {
        start_dealer_cards=deck.pop()  
        putTheCards(start_dealer_cards,"dealer")  
        dealer_Ace += checkAce(start_dealer_cards)    
        dealer_sum += cardValue(start_dealer_cards)
        let counts=reduceAce(dealer_sum,dealer_Ace)
        dealer_Ace=counts[1]
        dealer_sum=counts[0]
    }

    result()
    return;
}

function stay(){

    dealerDraw();
    canHit =false;
}

function result(){
    let message="";
    if(player_sum>21)
    {
        message = "You Lose!";
    }
    else if(dealer_sum>21){
        message = "You win!";
    }
    else if(player_sum===dealer_sum){
        message = "Push!";
    }
    else if(player_sum>dealer_sum){
        message = "You win!";
    }
    else 
    {
        message = "You Lose!";
    }
    Again_button_Create();
    document.getElementById("play_again").addEventListener("click",play_Again);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("dealer-sum").innerText = dealer_sum;
    document.getElementById("results").innerText = message;
}

function Again_button_Create(){
    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Play Again!");
    x.setAttribute("id","play_again");
    x.appendChild(t);
    document.body.appendChild(x);
}

function play_Again(){
    window.location.reload();
}
