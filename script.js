// Variables
var names = {
    town: "",
    mayor: "",
},
    wood = {
        name: "wood",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
            wood: 50,
            stone: 50
        }
    },
    stone = {
        name: "stone",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
            wood: 50,
            stone: 50
        }
    },
    iron = {
    	name: "iron",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
        	wood: 100,
            stone: 100
        }
    },
    food = {
        name: "food",
        amount: 0,
        increment: 0,
        max: 100,
        storage: 0,
        storageCost: {
            wood: 50,
            stone: 50
        }
    },
    worker = {
        name: "worker",
        amount: 0,
        lumberjack: {
            increment: 1,
            amount: 0,
            cost: 10
        },
        miner: {
            increment: 1,
            amount: 0,
            cost: 10
        },
        scraper: {
        	increment: 1,
            amount: 0,
            cost: 10
        },
        hunter: {
            increment: 1,
            amount: 0,
            cost: 10
        }
    }, // Buildings
    tent = {
        amount: 0,
        residents: 1,
        cost: {
            wood: 30
        }
    },
    house = {
        amount: 0,
        residents: 4,
        cost: {
            wood: 75,
            stone: 25
        }
    },
    improvedhouse = {
    	amount: 0,
        residents: 8,
        cost: {
        	wood: 200,
            stone: 70,
            iron: 500
        }
    },
    hostel = {
        amount: 0,
        residents: 10,
        cost: {
            wood: 200,
            stone: 215
        }
    };
    
//Audio Declarations
var chopping_wood_audio = new Audio("sounds/resources/chopping_wood.mp3");
var mine_stone_audio = new Audio("sounds/resources/mine_stone.mp3");
var mine_iron_audio = new Audio("sounds/resources/mine_iron.mp3");
var gather_food_audio = new Audio("sounds/resources/gather_food.mp3");
var background_audio = new Audio("sounds/background/bensound-happiness.mp3");

//Audio Helper Function

function audioHelper(audioSupport){
	if(audioSupport.duration > 0 && !audioSupport.paused){
		//already playing
		audioSupport.pause();
		audioSupport.currentTime = 0;
		audioSupport.play();
	} else{
        	//not playing
			audioSupport.play();    
        }
}

var maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
var clickIncrement = 1; // Consider changing this to specific materials.

// All OnLoad Functions
// Modal Commented out during development
$(document).ready(function () {
    $('#onLoadModal').modal();
    beginTick();
    updateValues();


    // Get town and mayor names and display them.
    $('#modalClose').click(function () {
        names.town = document.getElementById('town').value;
        document.getElementById("townName").innerHTML = names.town;
        names.mayor = document.getElementById('mayor').value;
        document.getElementById("mayorName").innerHTML = names.mayor;
    });

    function beginTick() {
        nIntervId = setInterval(tick, 5000);
    }

    function tick() {
        gatherWood();
        gatherStone();
        gatherIron();
        gatherFood();
    }
    
    var timer = 10;
	var lastSave;

    // Display the correct values.
    function updateValues() {
        document.getElementById("woodAmount").innerHTML = wood.amount;
        document.getElementById("maxWood").innerHTML = wood.max;
        document.getElementById("woodIncrement").innerHTML = wood.increment;
        document.getElementById("stoneAmount").innerHTML = stone.amount;
        document.getElementById("maxStone").innerHTML = stone.max;
        document.getElementById("stoneIncrement").innerHTML = stone.increment;
        document.getElementById("ironAmount").innerHTML = iron.amount;
        document.getElementById("maxIron").innerHTML = iron.max;
        document.getElementById("ironIncrement").innerHTML = iron.increment;
        document.getElementById("foodAmount").innerHTML = food.amount;
        document.getElementById("maxFood").innerHTML = food.max;
        document.getElementById("foodIncrement").innerHTML = food.increment;

        document.getElementById("workerAmount").innerHTML = worker.amount;
        document.getElementById("maxPop").innerHTML = maxPop;
        document.getElementById("lumberjackAmount").innerHTML = worker.lumberjack.amount;
        document.getElementById("lumberjackCost").innerHTML = worker.lumberjack.cost;
        document.getElementById("minerAmount").innerHTML = worker.miner.amount;
        document.getElementById("minerCost").innerHTML = worker.miner.cost;
        document.getElementById("scraperAmount").innerHTML = worker.scraper.amount;
        document.getElementById("scraperCost").innerHTML = worker.scraper.cost;
        document.getElementById("hunterAmount").innerHTML = worker.hunter.amount;
        document.getElementById("hunterCost").innerHTML = worker.hunter.cost;

        document.getElementById("tentAmount").innerHTML = tent.amount;
        document.getElementById("tentCostWood").innerHTML = tent.cost.wood;
        document.getElementById("tentResidents").innerHTML = tent.residents;
        document.getElementById("houseAmount").innerHTML = house.amount;
        document.getElementById("houseCostWood").innerHTML = house.cost.wood;
        document.getElementById("houseCostStone").innerHTML = house.cost.stone;
        document.getElementById("houseResidents").innerHTML = house.residents;
        document.getElementById("improvedhouseAmount").innerHTML = improvedhouse.amount;
        document.getElementById("improvedhouseCostWood").innerHTML = improvedhouse.cost.wood;
        document.getElementById("improvedhouseCostStone").innerHTML = improvedhouse.cost.stone;
        document.getElementById("improvedhouseCostIron").innerHTML = improvedhouse.cost.iron;
        document.getElementById("improvedhouseResidents").innerHTML = improvedhouse.residents;
        document.getElementById("hostelAmount").innerHTML = hostel.amount;
        document.getElementById("hostelCostWood").innerHTML = hostel.cost.wood;
        document.getElementById("hostelCostStone").innerHTML = hostel.cost.stone;
        document.getElementById("hostelResidents").innerHTML = hostel.residents;
        document.getElementById("woodStorageAmount").innerHTML = wood.storage;
        document.getElementById("woodStorageCostWood").innerHTML = wood.storageCost.wood;
        document.getElementById("woodStorageCostStone").innerHTML = wood.storageCost.stone;
        document.getElementById("stoneStorageAmount").innerHTML = stone.storage;
        document.getElementById("stoneStorageCostWood").innerHTML = stone.storageCost.wood;
        document.getElementById("stoneStorageCostStone").innerHTML = stone.storageCost.stone;
        document.getElementById("ironStorageAmount").innerHTML = iron.storage;
        document.getElementById("ironStorageCostWood").innerHTML = iron.storageCost.wood;
        document.getElementById("ironStorageCostStone").innerHTML = iron.storageCost.stone;
        document.getElementById("foodStorageAmount").innerHTML = food.storage;
        document.getElementById("foodStorageCostWood").innerHTML = food.storageCost.wood;
        document.getElementById("foodStorageCostStone").innerHTML = food.storageCost.stone;
        
        document.getElementById("autosave").innerHTML = "Auto-Saving in " + timer + " Last Save: " + lastSave;
    }

    // Click to Chop, Mine, Gather
    $('#chopWood').click(function () {
        wood.amount = wood.amount + clickIncrement;
        checkMaxWood();
        updateValues();
        audioHelper(chopping_wood_audio);
    });

    $('#mineStone').click(function () {
        stone.amount = stone.amount + clickIncrement;
        checkMaxStone();
        updateValues();
        audioHelper(mine_stone_audio);
    });
    
    $('#mineIron').click(function (){
    	iron.amount = iron.amount + clickIncrement;
        checkMaxIron();
        updateValues();
        audioHelper(mine_iron_audio);
    });

    $('#gatherFood').click(function () {
        food.amount = food.amount + clickIncrement;
        checkMaxFood();
        updateValues();
        audioHelper(gather_food_audio);
    });

    // Create Workers
    $('#createLumberjack').click(function () {
        if (worker.amount < maxPop) {
            if (food.amount >= worker.lumberjack.cost) {
                food.amount = food.amount - worker.lumberjack.cost;
                worker.amount++;
                worker.lumberjack.amount++;
                worker.lumberjack.cost++;
                wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
                updateValues();
            } else {
                $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
            }
        } else {
            $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
        }
    });

    $('#createMiner').click(function () {
        if (worker.amount < maxPop) {
            if (food.amount >= worker.miner.cost) {
                food.amount = food.amount - worker.miner.cost;
                worker.amount++;
                worker.miner.amount++;
                worker.miner.cost++;
                stone.increment = worker.miner.increment * worker.miner.amount;
                updateValues();
            } else {
                $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
            }
        } else {
            $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
        }
    });
    
    $('#createScraper').click(function () {
    	if(worker.amount < maxPop){
        	if(food.amount >= worker.scraper.cost){
            	food.amount = food.amount - worker.scraper.cost;
                worker.amount++;
                worker.scraper.amount++;
                worker.scraper.cost++;
                iron.increment = worker.scraper.increment * worker.scraper.amount;
                updateValues();
            } else{
            	$("#info").prepend($('<p>You need more food</p>').fadeIn('slow'));
            }
        } else{
        	$("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
        }
    });

    $('#createHunter').click(function () {
        if (worker.amount < maxPop) {
            if (food.amount >= worker.hunter.cost) {
                food.amount = food.amount - worker.hunter.cost;
                worker.amount++;
                worker.hunter.amount++;
                worker.hunter.cost++;
                food.increment = worker.hunter.increment * worker.hunter.amount;
                updateValues();
            } else {
                $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
            }
        } else {
            $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
        }
    });

    // Lumberjacks Gather Wood
    function gatherWood() {
        wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
        wood.amount = wood.amount + wood.increment;
        checkMaxWood();
        updateValues();
    }

    // Miner Gather Stone
    function gatherStone() {
        stone.increment = worker.miner.increment * worker.miner.amount;
        stone.amount = stone.amount + stone.increment;
        checkMaxStone();
        updateValues();
    }
    
    //Scraper Gather Iron
    function gatherIron(){
    	iron.increment = worker.scraper.increment * worker.scraper.amount;
        iron.amount = iron.amount + iron.increment;
        checkMaxIron();
        updateValues();
    }

    // Hunter Gather Food
    function gatherFood() {
        food.increment = worker.hunter.increment * worker.hunter.amount;
        food.amount = food.amount + food.increment;
        checkMaxFood();
        updateValues();
    }

    // Test max resources
    function checkMaxWood() {
        if (wood.amount > wood.max) {
            wood.amount = wood.max;
        }
    }

    function checkMaxStone() {
        if (stone.amount > stone.max) {
            stone.amount = stone.max;
        }
    }
    
    function checkMaxIron(){
    	if(iron.amount > iron.max){
        	iron.amount = iron.max;
        }
    }

    function checkMaxFood() {
        if (food.amount > food.max) {
            food.amount = food.max;
        }
    }
    
    //Upgrade Saving
    var TwoFingers = 0;
    var FiveFingers = 0;
    var TenFingers = 0;
    var DoubleSleepingBags = 0;
    var TripleSleepingBags = 0;
    var BunkBeds = 0;
    var SharpenAxes = 0;
    var SharpenPicks = 0;
    var SharpenArrows = 0;
    var MatesRatesWood = 0;
    var MatesRatesStone = 0;
    
	function save_game() {
		localStorage['rpg_save[wood]'] = btoa(JSON.stringify(wood));
		localStorage['rpg_save[stone]'] = btoa(JSON.stringify(stone));
        localStorage['rpg_save[iron]'] = btoa(JSON.stringify(iron));
		localStorage['rpg_save[food]'] = btoa(JSON.stringify(food));
		localStorage['rpg_save[worker]'] = btoa(JSON.stringify(worker));
		
		localStorage['rpg_save[tent]'] = btoa(JSON.stringify(tent));
		localStorage['rpg_save[house]'] = btoa(JSON.stringify(house));
        localStorage['rpg_save[improvedhouse]'] = btoa(JSON.stringify(improvedhouse));
		localStorage['rpg_save[hostel]'] = btoa(JSON.stringify(hostel));
        
        localStorage.setItem("rpg_save[TwoFingers]",TwoFingers);
        localStorage.setItem("rpg_save[TenFingers]",TenFingers);
        localStorage.setItem("rpg_save[DoubleSleepingBags]",DoubleSleepingBags);
        localStorage.setItem("rpg_save[TripleSleepingBags]",TripleSleepingBags);
        localStorage.setItem("rpg_save[BunkBeds]",BunkBeds);
        localStorage.setItem("rpg_save[SharpenAxes]",SharpenAxes);
        localStorage.setItem("rpg_save[SharpenPicks]",SharpenPicks);
        localStorage.setItem("rpg_save[SharpenArrows]",SharpenArrows);
        localStorage.setItem("rpg_save[MatesRatesWood]",MatesRatesWood);
        localStorage.setItem("rpg_save[MatesRatesStone]",MatesRatesStone);
	}
	function load_game() {
		if (!localStorage['rpg_save[wood]']) return;
		
		var wood_save = JSON.parse(atob(localStorage['rpg_save[wood]']));
		var stone_save = JSON.parse(atob(localStorage['rpg_save[stone]']));
        var iron_save = JSON.parse(atob(localStorage['rpg_save[iron]']));
		var food_save = JSON.parse(atob(localStorage['rpg_save[food]']));
		var worker_save = JSON.parse(atob(localStorage['rpg_save[worker]']));
		
		var tent_save = JSON.parse(atob(localStorage['rpg_save[tent]']));
		var house_save = JSON.parse(atob(localStorage['rpg_save[house]']));
        var improvedhouse_save = JSON.parse(atob(localStorage['rpg_save[improvedhouse]']));
		var hostel_save = JSON.parse(atob(localStorage['rpg_save[hostel]']));
        
        var TwoFingers_save = localStorage.getItem("rpg_save[TwoFingers]");
    	var FiveFingers_save = localStorage.getItem("rpg_save[FiveFingers]");
    	var TenFingers_save = localStorage.getItem("rpg_save[TenFingers]");
    	var DoubleSleepingBags_save = localStorage.getItem("rpg_save[DoubleSleepingBags]");
    	var TripleSleepingBags_save = localStorage.getItem("rpg_save[TripleSleepingBags]");
    	var BunkBeds_save = localStorage.getItem("rpg_save[BunkBeds]");
    	var SharpenAxes_save = localStorage.getItem("rpg_save[SharpenAxes]");
    	var SharpenPicks_save = localStorage.getItem("rpg_save[SharpenPicks]");
    	var SharpenArrows_save = localStorage.getItem("rpg_save[SharpenArrows]");
    	var MatesRatesWood_save = localStorage.getItem("rpg_save[MatesRatesWood]");
    	var MatesRatesStone_save = localStorage.getItem("rpg_save[MatesRatesStone]");

        
		wood = wood_save;
		stone = stone_save;
        iron = iron_save;
		food = food_save;
		worker = worker_save;
		
		tent = tent_save;
		house = house_save;
        improvedhouse = improvedhouse_save;
		hostel = hostel_save;
		maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
        
        TwoFingers = TwoFingers_save;
    	FiveFingers = FiveFingers_save;
    	TenFingers = TenFingers_save;
    	DoubleSleepingBags = DoubleSleepingBags_save;
    	TripleSleepingBags = TripleSleepingBags_save;
    	BunkBeds = BunkBeds_save;
    	SharpenAxes = SharpenAxes_save;
    	SharpenPicks = SharpenPicks_save;
    	SharpenArrows = SharpenArrows_save;
    	MatesRatesWood = MatesRatesWood_save;
    	MatesRatesStone = MatesRatesStone_save;
        
		updateValues();
        HideUpgrades();
	}

    // Build a tent
    $('#buildTent').click(function () {
        if (wood.amount >= tent.cost.wood) {
            wood.amount = wood.amount - tent.cost.wood;
            tent.amount++;
            tent.cost.wood = tent.cost.wood * 1.2;
            tent.cost.wood = tent.cost.wood.toFixed(0); 
            maxPop = maxPop + tent.residents;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more wood.</p>').fadeIn('slow'));
        }
    });

    // Build a house
    $('#buildHouse').click(function () {
        if (wood.amount >= house.cost.wood && stone.amount >= house.cost.stone) {
            wood.amount = wood.amount - house.cost.wood;
            stone.amount = stone.amount - house.cost.stone;
            house.amount++;
            house.cost.wood = house.cost.wood * 1.2;
            house.cost.stone = house.cost.stone * 1.2;
            house.cost.wood = house.cost.wood.toFixed(0);
            house.cost.stone = house.cost.stone.toFixed(0);
            maxPop = maxPop + house.residents;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });
    
    //Build Improved House
    $('#buildImprovedHouse').click(function (){
    	if(wood.amount >= improvedhouse.cost.wood && stone.amount >= improvedhouse.cost.stone && iron.amount >= improvedhouse.cost.iron){
        	wood.amount = wood.amount - improvedhouse.cost.wood;
            stone.amount = stone.amount - improvedhouse.cost.stone;
            iron.amount = iron.amount - improvedhouse.cost.iron;
            improvedhouse.amount++;
            improvedhouse.cost.wood = improvedhouse.cost.wood * 1.2;
            improvedhouse.cost.stone = improvedhouse.cost.stone * 1.2;
            improvedhouse.cost.iron = improvedhouse.cost.iron * 1.2;
            improvedhouse.cost.wood = improvedhouse.cost.wood.toFixed(0);
            improvedhouse.cost.stone = improvedhouse.cost.stone.toFixed(0);
            improvedhouse.cost.iron = improvedhouse.cost.iron.toFixed(0);
            maxPop = maxPop + improvedhouse.residents;
            updateValues();
        } else{
        	$("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });

    // Research Hostel
    $('#researchHostel').click(function () {
        if (wood.amount >= 400 && stone.amount >= 150) {
            wood.amount = wood.amount - 400;
            stone.amount = stone.amount - 150;

            $('#researchHostel').addClass('hidden');
            $('.progress-wrap-hostel').removeClass('hidden');

            var getPercent = ($('.progress-wrap-hostel').data('progress-percent-hostel') / 100);
            var getProgressWrapWidth = $('.progress-wrap-hostel').width();
            var progressTotal = getPercent * getProgressWrapWidth;
            var animationLength = 25000;

            $('.progress-bar-hostel').stop().animate({
                    left: progressTotal
                },
                animationLength,
                function () {
                    $('#buildHostel').removeClass('hidden');
                    $('.progress-wrap-hostel').addClass('hidden');
                    $('.hostelInfo').removeClass('hidden');
                    $('.hostelResearchInfo').addClass('hidden');
                });
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });

    // Build a hostel
    $('#buildHostel').click(function () {
        if (wood.amount >= hostel.cost.wood && stone.amount >= hostel.cost.stone) {
            wood.amount = wood.amount - hostel.cost.wood;
            stone.amount = stone.amount - hostel.cost.stone;
            hostel.amount++;
            hostel.cost.wood = hostel.cost.wood * 1.2;
            hostel.cost.stone = hostel.cost.stone * 1.2;
            hostel.cost.wood = hostel.cost.wood.toFixed(0);
            hostel.cost.stone = hostel.cost.stone.toFixed(0);
            maxPop = maxPop + hostel.residents;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });

    // Build wood storage
    $('#buildWoodStorage').click(function () {
        if (wood.amount >= wood.storageCost.wood && stone.amount >= wood.storageCost.stone) {
            wood.amount = wood.amount - wood.storageCost.wood;
            stone.amount = stone.amount - wood.storageCost.stone;
            wood.storage++;
            wood.max = wood.max + 100;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });

    // Build stone storage
    $('#buildStoneStorage').click(function () {
        if (wood.amount >= stone.storageCost.wood && stone.amount >= stone.storageCost.stone) {
            wood.amount = wood.amount - stone.storageCost.wood;
            stone.amount = stone.amount - stone.storageCost.stone;
            stone.storage++;
            stone.max = stone.max + 100;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });
    
    $('#buildIronStorage').click(function () {
    	if(wood.amount >= iron.storageCost.wood && stone.amount >= iron.storageCost.stone){
        	wood.amount = wood.amount - iron.storageCost.wood;
            stone.amount = stone.amount - iron.storageCost.stone;
            iron.storage++;
            iron.max = stone.max + 100;
            updateValues();
        } else{
        	$("#info").prepend($('<p>You need more building materials.</p').fadeIn('slow'));
        }
    });

    // Build food storage
    $('#buildFoodStorage').click(function () {
        if (wood.amount >= food.storageCost.wood && stone.amount >= food.storageCost.stone) {
            wood.amount = wood.amount - food.storageCost.wood;
            stone.amount = stone.amount - food.storageCost.stone;
            food.storage++;
            food.max = food.max + 100;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });

    // Upgrades
    $('#upgradeTwoFingers').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            clickIncrement = clickIncrement + 1;
            TwoFingers = 1;
            $('.upgradeTwoFingers').addClass('hidden');
            $('.upgradeFiveFingers').removeClass('hidden');
            $("#upgrades").prepend($('<p>Two Fingers | Two Resources Per Click</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeFiveFingers').click(function () {
        if (wood.amount >= 450 && stone.amount >= 450 && food.amount >= 120) {
            wood.amount = wood.amount - 450;
            stone.amount = stone.amount - 450;
            food.amount = food.amount - 120;
            clickIncrement = clickIncrement + 3;
            FiveFingers = 1;
            $('.upgradeFiveFingers').addClass('hidden');
            $('.upgradeTenFingers').removeClass('hidden');
            $("#upgrades").prepend($('<p>Five Fingers | Five Resources Per Click</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });
    
    $('#upgradeTenFingers').click(function(){
    	if(wood.amount >= 750 && stone.amount >= 750 && food.amount >= 250){
    		wood.amount = wood.amount - 750;
    		stone.amount = stone.amount - 750;
    		food.amount = food.amount - 250;
    		clickIncrement = clickIncrement + 5;
            TenFingers = 1;
    		$('.upgradeTenFingers').addClass('hidden');
    		$("#upgrades").prepend($('<p>Ten Fingers | Ten Resources Per Click</p>').fadeIn('slow'));
    		updateValues();
    	}else{
    		$("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    	}
    });

    $('#upgradeDoubleSleepingBags').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            tent.residents = 2;
            maxPop = maxPop + tent.amount; //This only works because we are adding ONE resident.
            DoubleSleepingBags = 1;
            $('.upgradeDoubleSleepingBags').addClass('hidden');
            $('.upgradeTripleSleepingBags').removeClass('hidden');
            $("#upgrades").prepend($('<p>Double Sleeping Bags | Two People, One Tent</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });
    
    $('#upgradeTripleSleepingBags').click(function (){
    	if(wood.amount >= 300 && stone.amount >= 300 && food.amount >= 200){
        	wood.amount = wood.amount - 300;
            stone.amount = stone.amount - 300;
            food.amount = food.amount - 200;
            tent.residents = 3;
            maxPop = maxPop + tent.amount;
            TripleSleepingBags = 1;
            $('.upgradeTripleSleepingBags').addClass('hidden');
            $("#upgrades").prepend($('<p>Triple Sleeping Bags | Three People, One Tent</p>').fadeIn('slow'));
            updateValues();
        } else{
        	$("#info").prepend($('<p>You need more resources</p>').fadeIn('slow'));
        }
    });

    $('#upgradeBunkBeds').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            house.residents = 5;
            maxPop = maxPop + house.amount; //This only works because we are adding ONE resident.
            BunkBeds = 1;
            $('.upgradeBunkBeds').addClass('hidden');
            $("#upgrades").prepend($('<p>Bunk Beds | Five People, One House</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeSharpenAxes').click(function () {
        if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
            wood.amount = wood.amount - 50;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 50;
            worker.lumberjack.increment = 2;
            wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
            SharpenAxes = 1;
            $('.upgradeSharpenAxes').addClass('hidden');
            $("#upgrades").prepend($('<p>Sharpen Axes | Lumberjacks Chop Two Wood Each</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeSharpenPicks').click(function () {
        if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
            wood.amount = wood.amount - 50;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 50;
            worker.miner.increment = 2;
            stone.increment = worker.miner.increment * worker.miner.amount;
            SharpenPicks = 1;
            $('.upgradeSharpenPicks').addClass('hidden');
            $("#upgrades").prepend($('<p>Sharpen Picks | Miners Mine Two Stone Each</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeSharpenArrows').click(function () {
        if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
            wood.amount = wood.amount - 50;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 50;
            worker.hunter.increment = 2;
            food.increment = worker.hunter.increment * worker.hunter.amount;
            SharpenArrows = 1;
            $('.upgradeSharpenArrows').addClass('hidden');
            $("#upgrades").prepend($('<p>Sharpen Arrows | Hunters Gather Two Food Each</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeMatesRatesWood').click(function () {
        if (stone.amount >= 150 && food.amount >= 50) {
            stone.amount = stone.amount - 150;
            food.amount = food.amount - 50;
            house.cost.wood = house.cost.wood - 20;
            tent.cost.wood = tent.cost.wood - 15;
            MatesRatesWood = 1;
            $('.upgradeMatesRatesWood').addClass('hidden');
            $("#upgrades").prepend($('<p>Mates Rates - Wood | Houses and Tents Cost Less Wood</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeMatesRatesStone').click(function () {
        if (wood.amount >= 150 && food.amount >= 50) {
            wood.amount = wood.amount - 150;
            food.amount = food.amount - 50;
            house.cost.stone = house.cost.stone - 20;
            MatesRatesStone = 1;
            $('.upgradeMatesRatesStone').addClass('hidden');
            $("#upgrades").prepend($('<p>Mates Rates - Stone | Houses Cost Less Stone</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });
    
    //Hide Upgrades if they have already been bought
    function HideUpgrades(){
    	if(TwoFingers == 1){
        	$('.upgradeTwoFingers').addClass('hidden');
            $('.upgradeFiveFingers').removeClass('hidden');
            clickIncrement = clickIncrement + 1;
        }
        
        if(FiveFingers == 1){
        	$('.upgradeFiveFingers').addClass('hidden');
            $('.upgradeTenFingers').removeClass('hidden');
            clickIncrement = clickIncrement + 3;
        }
        
        if(TenFingers == 1){
        	$('.upgradeTenFingers').addClass('hidden');
            clickIncrement = clickIncrement + 5;
        }
        
        if(DoubleSleepingBags == 1){
        	$('.upgradeDoubleSleepingBags').addClass('hidden');
            $('.upgradeTripleSleepingBags').removeClass('hidden');
            tent.residents = 2;
            maxPop = maxPop + tent.amount;
        }
        
        if(TripleSleepingBags == 1){
        	$('.upgradeTripleSleepingBags').addClass('hidden');
            tent.residents = 3;
            maxPop = maxPop + tent.amount;
        }
        
        if(BunkBeds == 1){
        	$('.upgradeBunkBeds').addClass('hidden');
            house.residents = 5;
            maxPop = maxPop + house.amount;
        }
        
        if(SharpenAxes == 1){
        	$('.upgradeSharpenAxes').addClass('hidden');
            worker.lumberjack.increment = 2;
            wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
        }
        
        if(SharpenPicks == 1){
        	$('.upgradeSharpenPicks').addClass('hidden');
            worker.miner.increment = 2;
            stone.increment = worker.miner.increment * worker.miner.amount;
        }
        
        if(SharpenArrows == 1){
        	$('.upgradeSharpenArrows').addClass('hidden');
            worker.hunter.increment = 2;
            food.increment = worker.hunter.increment * worker.hunter.amount;
        }
        
        if(MatesRatesWood == 1){
        	$('.upgradeMatesRatesWood').addClass('hidden');
            house.cost.wood = house.cost.wood - 20;
            tent.cost.wood = tent.cost.wood - 15;
        }
        
        if(MatesRatesStone == 1){
        	$('.upgradeMatesRatesStone').addClass('hidden');
            house.cost.stone = house.cost.stone - 20;
        }
    }
    
    function Timer(){
    	if(timer > 0){
        	timer--;
            updateValues();
        } else{
        	lastSave = new Date().toLocaleString();
        	timer = 10;
            updateValues();
        }
    }
    
    setInterval(Timer,1000);
    
	setInterval(function () { save_game(); }, 10000);
	load_game();
}); /*document.ready*/

