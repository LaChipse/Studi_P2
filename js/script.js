$(document).ready(function() {


    /* initialisation des variables */
    playerOne = true
    roundNumb = 0
    globalNumb = 0
    a = 0
    diceFace = $("#dice")

    /* tableau contenant les images pour les faces du dé */
    let valueDice = ["images/face1.png", "images/face2.png", "images/face3.png", "images/face4.png", "images/face5.png", "images/face6.png"]


    /* changement aspect de la colonne joueur selon celui qui joue */
    function setColor() {
        if (playerOne) {
            $("#squareRoundOne").css("opacity", 1)
            $("#squareRoundTwo").css("opacity", 0.3)

            $("#global-h2p1").css("color", "black")
            $("#global-h2p2").css("color", "#dbdbdb")
        } else {
            $("#squareRoundOne").css("opacity", 0.3)
            $("#squareRoundTwo").css("opacity", 1)

            $("#global-h2p1").css("color", "white")
            $("#global-h2p2").css("color", "black")
        }
    }

    /* fonction de réinitialisation des valeurs */
    function initialSet() {
        playerOne = true;
        roundNumb = 0;
        globalNumb = 0;

        $("#valueRound1").text(roundNumb)
        $("#valueRound2").text(roundNumb)

        $("#valueGlobal1").text(globalNumb)
        $("#valueGlobal2").text(globalNumb)

        setColor()
    }

    /* fonction de contrôle du score global de chaque joueur et des conditions de victoire */
    function saveValue(x, y) {
        roundValue = parseInt($(x).text())
        globalNumb += roundValue

        globalNumbValue = parseInt($(y).text())
        $(y).text(globalNumbValue += globalNumb)

        if (parseInt($(y).text()) >= 100) {

            if (playerOne) {
                alert("Player 1 Win !")
            } else {
                alert("Player 2 Win !")
            }

            initialSet()

        } else {
            roundNumb = 0
            $(x).text(roundNumb)

            globalNumb = 0
            roundValue = 0

            playerOne = !playerOne
        }
    }

    /* fonction de contrôle du score du round de chaque joueur (0 et fin si le score est 1) */
    function currentValue(x) {
        if (a === 1) {
            roundNumb = 0
            playerOne = !playerOne

        } else {
            roundNumb += a
        }
        $(x).text(roundNumb)
    }

    /* evenement au clique sur icône ROLL DICE qui change aléatoirement la face du dé puis appelle la fonction qui attribut le score du round avec les paramétres correspondant au joueur qui joue */
    $("#roll_dice").click(function() {

        a = Math.floor((Math.random() * 6) + 1);
        diceFace.css("background-image", "url(" + valueDice[a - 1] + ")")

        if (playerOne) {
            currentValue("#valueRound1")
        } else {
            currentValue("#valueRound2")
        }
        setColor()
    });

    /* evenement au clique sur icône HOLD qui appelle la fonction pour sauvegarder valeur du round vers le score gloabl avec les paramétres correspondant au joueur qui joue */
    $("#holdValue").click(function() {

        if (playerOne) {
            saveValue("#valueRound1", "#valueGlobal1")
        } else {
            saveValue("#valueRound2", "#valueGlobal2")
        }
        setColor()
    })


    /* appel de la fonction de réinitialisation lors d'un clique sur le bouton NEWGAME */
    $("#newGame").click(function() {
        initialSet()
    })

    setColor()

});