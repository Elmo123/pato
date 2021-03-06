import mongoose from 'mongoose';
import Movie from './models/movie';

const movies = [
  {
            timestamp : 1537768683,
            flowspeed : 3.76026430797,
            elevation : 99.9757786817
        }, 
        {
            timestamp : 1537768682,
            flowspeed : -0.208193240497,
            elevation : 86.5944152773
        }, 
        {
            timestamp : 1537768681,
            flowspeed : 3.9928590446,
            elevation : 86.5280686135
        }, 
        {
            timestamp : 1537768680,
            flowspeed : -0.230848091098,
            elevation : 87.3747441797
        }, 
        {
            timestamp : 1537768679,
            flowspeed : 2.89010811153,
            elevation : 87.0084955148
        }, 
        {
            timestamp : 1537768678,
            flowspeed : 3.2723856249,
            elevation : 86.5288651757
        }, 
        {
            timestamp : 1537768677,
            flowspeed : 3.43140219752,
            elevation : 86.7547032122
        }, 
        {
            timestamp : 1537768676,
            flowspeed : -0.52032230714,
            elevation : 87.0347317334
        }, 
        {
            timestamp : 1537768675,
            flowspeed : 0.155858941279,
            elevation : 87.3567674592
        }, 
        {
            timestamp : 1537768674,
            flowspeed : -0.90639538266,
            elevation : 86.9794486671
        }, 
        {
            timestamp : 1537768673,
            flowspeed : 2.73893969744,
            elevation : 86.907101543
        }, 
        {
            timestamp : 1537768672,
            flowspeed : -0.338836880608,
            elevation : 87.3453848301
        }, 
        {
            timestamp : 1537768671,
            flowspeed : 3.27265070845,
            elevation : 87.1964917601
        }, 
        {
            timestamp : 1537768670,
            flowspeed : -0.245147972457,
            elevation : 87.3531361283
        }, 
        {
            timestamp : 1537768669,
            flowspeed : -0.467777475364,
            elevation : 87.4262270452
        }, 
        {
            timestamp : 1537768668,
            flowspeed : -0.915074005115,
            elevation : 86.5808076865
        }, 
        {
            timestamp : 1537768667,
            flowspeed : 1.87673716674,
            elevation : 87.4145051265
        }, 
        {
            timestamp : 1537768666,
            flowspeed : -0.993514070126,
            elevation : 87.4583005331
        }, 
        {
            timestamp : 1537768665,
            flowspeed : -0.65251401814,
            elevation : 86.9202636217
        }, 
        {
            timestamp : 1537768664,
            flowspeed : 3.02434157294,
            elevation : 86.7197041541
        }, 
        {
            timestamp : 1537768663,
            flowspeed : -0.949348333913,
            elevation : 87.4983536009
        }, 
        {
            timestamp : 1537768662,
            flowspeed : -0.986401301935,
            elevation : 87.4749036963
        }, 
        {
            timestamp : 1537768661,
            flowspeed : 0.314663946528,
            elevation : 86.9418723551
        }, 
        {
            timestamp : 1537768660,
            flowspeed : 3.4461886662,
            elevation : 87.3639534652
        }, 
        {
            timestamp : 1537768659,
            flowspeed : 3.98213968619,
            elevation : 86.9934515869
        }, 
        {
            timestamp : 1537768658,
            flowspeed : -0.61114794594,
            elevation : 86.9639785038
        }, 
        {
            timestamp : 1537768657,
            flowspeed : 3.55782553988,
            elevation : 87.4262729162
        }, 
        {
            timestamp : 1537768656,
            flowspeed : 0.304040646243,
            elevation : 87.2354479581
        }, 
        {
            timestamp : 1537768655,
            flowspeed : -0.107604520175,
            elevation : 86.8067469699
        }, 
        {
            timestamp : 1537768654,
            flowspeed : 3.99205465047,
            elevation : 86.6947313764
        }, 
        {
            timestamp : 1537768653,
            flowspeed : -0.688832830169,
            elevation : 87.0446493714
        }, 
        {
            timestamp : 1537768652,
            flowspeed : 3.84161603365,
            elevation : 87.4977668647
        }, 
        {
            timestamp : 1537768651,
            flowspeed : 1.76815707668,
            elevation : 87.3157400496
        }, 
        {
            timestamp : 1537768650,
            flowspeed : 1.54332557477,
            elevation : 87.0781273456
        }, 
        {
            timestamp : 1537768649,
            flowspeed : -0.893518061808,
            elevation : 87.3183931765
        }, 
        {
            timestamp : 1537768648,
            flowspeed : 3.86762022528,
            elevation : 87.1837425154
        }, 
        {
            timestamp : 1537768647,
            flowspeed : 3.35152534355,
            elevation : 87.3485503224
        }, 
        {
            timestamp : 1537768646,
            flowspeed : 2.15593711767,
            elevation : 87.4923836322
        }, 
        {
            timestamp : 1537768645,
            flowspeed : 3.15802720152,
            elevation : 86.7123722952
        }, 
        {
            timestamp : 1537768644,
            flowspeed : 3.70099541222,
            elevation : 86.6561885718
        }, 
        {
            timestamp : 1537768643,
            flowspeed : -0.998809086059,
            elevation : 86.6930722732
        }, 
        {
            timestamp : 1537768642,
            flowspeed : 3.58967624014,
            elevation : 86.5001051292
        }, 
        {
            timestamp : 1537768641,
            flowspeed : 1.99203688842,
            elevation : 87.1295450764
        }, 
        {
            timestamp : 1537768640,
            flowspeed : -0.805706608127,
            elevation : 87.4554772273
        }, 
        {
            timestamp : 1537768639,
            flowspeed : -0.834385868639,
            elevation : 87.4999957967
        }, 
        {
            timestamp : 1537768638,
            flowspeed : 3.00719764696,
            elevation : 87.1370644755
        }, 
        {
            timestamp : 1537768637,
            flowspeed : -0.642212511032,
            elevation : 86.5541063514
        }, 
        {
            timestamp : 1537768636,
            flowspeed : 3.98909391185,
            elevation : 86.7684885837
        }, 
        {
            timestamp : 1537768635,
            flowspeed : -0.726176216192,
            elevation : 86.6442304991
        }, 
        {
            timestamp : 1537768634,
            flowspeed : 0.695430777767,
            elevation : 87.4942061236
        }, 
        {
            timestamp : 1537768633,
            flowspeed : 3.99522322982,
            elevation : 86.6019513467
        }, 
        {
            timestamp : 1537768632,
            flowspeed : -0.970195436442,
            elevation : 87.1997327133
        }, 
        {
            timestamp : 1537768631,
            flowspeed : 3.99932418525,
            elevation : 86.5869271829
        }, 
        {
            timestamp : 1537768630,
            flowspeed : 2.17926415289,
            elevation : 87.3061610917
        }, 
        {
            timestamp : 1537768629,
            flowspeed : 3.86067032021,
            elevation : 87.4454041223
        }, 
        {
            timestamp : 1537768628,
            flowspeed : 3.90066123547,
            elevation : 86.7217008447
        }, 
        {
            timestamp : 1537768627,
            flowspeed : 0.902387699619,
            elevation : 87.2702335742
        }, 
        {
            timestamp : 1537768626,
            flowspeed : 0.991163820887,
            elevation : 87.4237614803
        }, 
        {
            timestamp : 1537768625,
            flowspeed : -0.168939406964,
            elevation : 86.5820749799
        }, 
        {
            timestamp : 1537768624,
            flowspeed : 0.686778705267,
            elevation : 87.0390933001
        }, 
        {
            timestamp : 1537768623,
            flowspeed : 3.24956615261,
            elevation : 86.761148027
        }, 
        {
            timestamp : 1537768622,
            flowspeed : 0.692303291322,
            elevation : 86.7347474676
        }, 
        {
            timestamp : 1537768621,
            flowspeed : 3.9116262254,
            elevation : 86.5260489933
        }, 
        {
            timestamp : 1537768620,
            flowspeed : -0.999440748704,
            elevation : 86.6362128209
        }, 
        {
            timestamp : 1537768619,
            flowspeed : 3.99953849741,
            elevation : 87.1311473284
        }, 
        {
            timestamp : 1537768618,
            flowspeed : 2.04943338436,
            elevation : 87.0057872026
        }, 
        {
            timestamp : 1537768617,
            flowspeed : 3.00691539745,
            elevation : 87.3287460839
        }, 
        {
            timestamp : 1537768616,
            flowspeed : 3.91129759831,
            elevation : 86.5650433696
        }, 
        {
            timestamp : 1537768615,
            flowspeed : 2.72925324445,
            elevation : 86.8425185834
        }, 
        {
            timestamp : 1537768614,
            flowspeed : -0.0162037181568,
            elevation : 86.6313816245
        }, 
        {
            timestamp : 1537768613,
            flowspeed : 0.0103934515166,
            elevation : 86.6162737355
        }, 
        {
            timestamp : 1537768612,
            flowspeed : -0.949428611367,
            elevation : 87.3648264995
        }, 
        {
            timestamp : 1537768611,
            flowspeed : 1.22097208995,
            elevation : 87.4994101441
        }, 
        {
            timestamp : 1537768610,
            flowspeed : -0.585046235376,
            elevation : 87.4287207022
        }, 
        {
            timestamp : 1537768609,
            flowspeed : 1.65272751463,
            elevation : 86.525826206
        }, 
        {
            timestamp : 1537768608,
            flowspeed : 0.621963336325,
            elevation : 87.0047992092
        }, 
        {
            timestamp : 1537768607,
            flowspeed : 3.42651332576,
            elevation : 87.2363551592
        }, 
        {
            timestamp : 1537768606,
            flowspeed : 2.01058195925,
            elevation : 87.4958864268
        }, 
        {
            timestamp : 1537768605,
            flowspeed : 3.96730045782,
            elevation : 86.9322202968
        }, 
        {
            timestamp : 1537768604,
            flowspeed : 3.16162916945,
            elevation : 87.0997728738
        }, 
        {
            timestamp : 1537768603,
            flowspeed : 1.34325538985,
            elevation : 86.8164708488
        }, 
        {
            timestamp : 1537768602,
            flowspeed : 3.65585083153,
            elevation : 86.5441453376
        }, 
        {
            timestamp : 1537768601,
            flowspeed : -0.50229976426,
            elevation : 86.5049065765
        }, 
        {
            timestamp : 1537768600,
            flowspeed : 1.39621414168,
            elevation : 87.4467921054
        }, 
        {
            timestamp : 1537768599,
            flowspeed : 0.62730082464,
            elevation : 86.6098040439
        }, 
        {
            timestamp : 1537768598,
            flowspeed : -0.0693383212967,
            elevation : 87.4612316005
        }, 
        {
            timestamp : 1537768597,
            flowspeed : -0.206639840557,
            elevation : 87.2008736895
        }, 
        {
            timestamp : 1537768596,
            flowspeed : 1.091095781,
            elevation : 86.9032415265
        }, 
        {
            timestamp : 1537768595,
            flowspeed : 3.82994921738,
            elevation : 87.4998899286
        }, 
        {
            timestamp : 1537768594,
            flowspeed : -0.157902269353,
            elevation : 87.4271069134
        }, 
        {
            timestamp : 1537768593,
            flowspeed : 3.27461122267,
            elevation : 87.4991604668
        }, 
        {
            timestamp : 1537768592,
            flowspeed : 0.734135225048,
            elevation : 87.4641630078
        }, 
        {
            timestamp : 1537768591,
            flowspeed : -0.96897806421,
            elevation : 87.3056287898
        }, 
        {
            timestamp : 1537768590,
            flowspeed : 0.0560964206851,
            elevation : 86.5015989047
        }, 
        {
            timestamp : 1537768589,
            flowspeed : 0.177211662766,
            elevation : 86.5015979552
        }, 
        {
            timestamp : 1537768588,
            flowspeed : 1.42350633353,
            elevation : 86.8916925017
        }, 
        {
            timestamp : 1537768587,
            flowspeed : 3.7820356579,
            elevation : 87.1863743547
        }, 
        {
            timestamp : 1537768586,
            flowspeed : 0.83004798578,
            elevation : 86.653783211
        }, 
        {
            timestamp : 1537768585,
            flowspeed : 0.432833212644,
            elevation : 87.3658087769
        }, 
        {
            timestamp : 1537768584,
            flowspeed : -0.262676819022,
            elevation : 87.2121611398
        }, 
        {
            timestamp : 1537768583,
            flowspeed : 3.55321757054,
            elevation : 87.483933706
        }, 
        {
            timestamp : 1537768582,
            flowspeed : 2.89233742711,
            elevation : 87.3075557606
        }, 
        {
            timestamp : 1537768581,
            flowspeed : 0.12416633146,
            elevation: 13.6643705657
        }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/test2');

// Go through each movie
movies.map(data => {
  // Initialize a model with movie data
  const movie = new Movie(data);
  // and save it into the database
  movie.save();
});