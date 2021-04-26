const fdClientModule = require('fantasydata-node-client');
const fetch= require('node-fetch')


//datos para la BD
require('./BD/Conecction')

//modelos
const Paises= require('./Modelos/Paises')
const equipos= require('./Modelos/Equipos')
const Jugadores = require('./Modelos/Jugadores');
const Torneos = require('./Modelos/Torneos');
const Rounds = require('./Modelos/Rounds');
const Partidos = require('./Modelos/Partidos')

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    if(d.toString().trim()=="si"){
        agregar_partidos();
    }

});

//llave API
const keys = {
    'Soccerv3StatsClient':'	6f9eed84ac7b4afcada93b07acce5790'
};

const FantasyDataClient = new fdClientModule(keys);

const agregar_partidos= ()=>{
    for(let a=2021;a<2022;a++){
        for(let i=6;i<13;i++){
            for(let j=1;j<32;j++){
                FantasyDataClient.Soccerv3StatsClient.getGamesByDatePromise(a+"-"+i+"-"+j)
                .then(res =>{
                    return JSON.parse(res)
                } )
                .then(cont=> 
                    cont.forEach(con => {
                        console.log(con.DateTime)
                        if(con.Season==2021){
                            let gana;
                            if(con.Status=='Final') {
                                if(con.HomeTeamScore==con.AwayTeamScore){
                                    gana='empate';
                                }
                                else if(con.HomeTeamScore>con.AwayTeamScore){
                                    gana='local';
                                }else{
                                    gana='visitante';
                                }
                            }else{
                                gana=null;
                            }
                            const partido= new Partidos({
                                _id:con.GameId,
                                round:con.RoundId,
                                equipo_local:con.HomeTeamId,
                                equipo_visitante: con.AwayTeamId,
                                hora_inicio:con.DateTime,
                                equipo_local_gol:con.HomeTeamScore,
                                equipo_visitante_gol:con.AwayTeamScore,
                                estado:con.Status,
                                ganador:gana
                            })
                            partido.save((err,document)=>{
                                if(err) console.log(err);
    
                                console.log(document);
                            });
                        }
                    // console.log("id: "+ con.AreaId + "pais: "+ con.Name);
                }))
                .catch(error => console.log(error)); 
            }
        }   
    }
}

/* const agregar_torneos= async ()=>{
        FantasyDataClient.Soccerv3StatsClient.getCompetitionsLeaguesPromise()
        .then(res =>{
            return JSON.parse(res)
        } )
        .then(cont=> 
            cont.forEach(con => {
                const torneos= new Torneos({
                    _id:con.CompetitionId,
                    Pais_continente:con.AreaId,
                    nombre:con.Name,
                    formato:con.Format
                })
                torneos.save((err,document)=>{
                    if(err) console.log(err);
                    console.log(document);
                });
                con.Seasons.forEach(seseon=>{
                    if(seseon.Season==2021){
                        seseon.Rounds.forEach(round=>{
                            const rounds= new Rounds({
                                _id:round.RoundId,
                                id_torneo:con.CompetitionId,
                                nombre:round.Name,
                                Temporada:round.Season,
                                Fecha_inicio:round.StartDate,
                                Fecha_fin:round.EndDate
                            })
                                rounds.save((err,document)=>{
                                if(err) console.log(err);
                                console.log(document);
                            });
                        })
                    }
                })
        // console.log("id: "+ con.AreaId + "pais: "+ con.Name);
        }))
        .catch(error => console.log(error)); 
    
} */

/* function run(){
        FantasyDataClient.Soccerv3StatsClient.getPlayersByTeamPromise(554)
        .then(res =>{
            return JSON.parse(res)
        })
        .then(cont=> 
                console.log(cont)
        )
        .catch(error => console.log(error));     
}
 */

/* const agregar_jugadores= async ()=>{
    const cursor =await equipos.find({_id:{$gt:1927,$lt:2472}}, {_id:1}).sort({_id:1})
    cursor.forEach(cur=>{
        FantasyDataClient.Soccerv3StatsClient.getPlayersByTeamPromise(cur._id)
        .then(res =>{
            return JSON.parse(res)
        } )
        .then(cont=> 
            cont.forEach(con => {
                const jugador= new Jugadores({
                    _id:con.PlayerId,
                    nacionalidad:con.Nationality,
                    nombre:con.CommonName,
                    url_foto: con.PhotoUrl||null,
                    equipo:cur._id,
                    numero_camisa:con.Jersey
                })
                jugador.save((err,document)=>{
                    if(err) console.log(err);

                    console.log(document);
                });
        // console.log("id: "+ con.AreaId + "pais: "+ con.Name);
        }))
        .catch(error => console.log(error));     
    })
    
} */

/* const agregar_equipos= ()=>{
    FantasyDataClient.Soccerv3StatsClient.getTeamsPromise()
    .then(res =>{
        return JSON.parse(res)
    } )
    .then(cont=> 
        cont.forEach(con => {
            const equipo= new equipos({
                _id:con.TeamId,
                id_pais:con.AreaId,
                nombre:con.Name,
                url_escudo: con.WikipediaLogoUrl||null,
                N_jugadores:0
            })
            equipo.save((err,document)=>{
                if(err) console.log(err);

                console.log(document);
            });
        // console.log("id: "+ con.AreaId + "pais: "+ con.Name);
    }))
    .catch(error => console.log(error)); 
} */
  
/* const agregar_equipos= ()=>{
    FantasyDataClient.Soccerv3StatsClient.getTeamsPromise()
    .then(res =>{
        return JSON.parse(res)
    } )
    .then(cont=> 
        cont.forEach(con => {
            const equipo= new equipos({
                _id:con.TeamId,
                id_pais:con.AreaId,
                nombre:con.Name,
                url_escudo: con.WikipediaLogoUrl,
                N_jugadores:0
            })
            equipo.save((err,document)=>{
                if(err) console.log(err);

                console.log(document);
            });
        // console.log("id: "+ con.AreaId + "pais: "+ con.Name);
    }))
    .catch(error => console.log(error)); 
} */

/* const agregar_pais= ()=>{
    FantasyDataClient.Soccerv3StatsClient.getAreasCountriesPromise()
    .then(res =>{
        return JSON.parse(res)
    } )
    .then(cont=> 
        cont.forEach(con => {
            const pais= new Paises({
                _id:con.AreaId,
                nombre: con.Name
            })
            pais.save((err,document)=>{
                if(err) console.log(err);

                console.log(document);
            });
        // console.log("id: "+ con.AreaId + "pais: "+ con.Name);
    }))
    .catch(error => console.log(error)); 
} */

//agregar_pais();
//agregar_equipos();
//run()
//agregar_jugadores();
//agregar_torneos();
//agregar_partidos();