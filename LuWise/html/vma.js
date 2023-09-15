<!--
// mise en forme de temps en seconde vers minutes et secondes
function MyTime(STemps) {
	var result = "";
	// suppressions des chiffres après la virgule
	STemps = (Math.round(STemps * 10) )/ 10;


	var MyMinut = (STemps - ( STemps % 60) ) / 60;
	if (MyMinut > 0) {result = result + MyMinut + " mn " };
	var MySecond = (Math.round((STemps % 60)*10)) / 10 ;
	if (MySecond > 0) {result = result + MySecond + " s" };
	return result }

// arrondi des distances
function MyDist(SDist) {
	// suppressions des chiffres après la virgule
	SDist = ( Math.round(SDist * 10) ) / 10;
	result = SDist + " m";

	return result }

function calculer() {
 var vma_value = document.calc.vma.value;
 var vma_ms = vma_value * 1000 / 3600;
 var vma_100 = 100 / vma_ms; // temps au 100 m à 100 %  VMA


 // orientation entraînement
 document.calc.Vmad1000_60_bis.value = MyTime(vma_100 / 60  * 1000);
 document.calc.Vmad1000_70_bis.value = MyTime(vma_100 / 70  * 1000);
 document.calc.Vmad1000_90_bi.value = MyTime(vma_100 / 90  * 1000);


 // Travail intermittent
 document.calc.Vmad100_115_bis.value = MyTime(vma_100 / 115 * 100);
 document.calc.Vmad100_110_bis.value = MyTime(vma_100 / 110 * 100);
 document.calc.Vmad100_105_bis.value = MyTime(vma_100 / 105 * 100);
 document.calc.Vmad100_100_bis.value = MyTime(vma_100 / 100 * 100);
 document.calc.Vmad100_95_bis.value = MyTime(vma_100 / 95 * 100);
 document.calc.Vmad100_90_bis.value = MyTime(vma_100 / 90 * 100);
 document.calc.Vmad100_85_bis.value = MyTime(vma_100 / 85 * 100);
 document.calc.Vmad100_80_bis.value = MyTime(vma_100 / 80 * 100);

 document.calc.Vmad1000_115_bis.value = MyTime(vma_100 / 115 * 1000);
 document.calc.Vmad1000_110_bis.value = MyTime(vma_100 / 110 * 1000);
 document.calc.Vmad1000_105_bis.value = MyTime(vma_100 / 105 * 1000);
 document.calc.Vmad1000_100_bis.value = MyTime(vma_100 / 100 * 1000);
 document.calc.Vmad1000_95_bis.value = MyTime(vma_100 / 95 * 1000);
 document.calc.Vmad1000_90_bis.value = MyTime(vma_100 / 90 * 1000);
 document.calc.Vmad1000_85_bis.value = MyTime(vma_100 / 85 * 1000);
 document.calc.Vmad1000_80_ter.value = MyTime(vma_100 / 80 * 1000);


 document.calc.Vmat30_80_bis.value = MyDist(vma_ms * 30 * 80  / 100);
 document.calc.Vmat30_85_bis.value = MyDist(vma_ms * 30 * 85  / 100);
 document.calc.Vmat30_90_bis.value = MyDist(vma_ms * 30 * 90  / 100);
 document.calc.Vmat30_95_bis.value = MyDist(vma_ms * 30 * 95  / 100);
 document.calc.Vmat30_100_bis.value = MyDist(vma_ms * 30 * 100  / 100);
 document.calc.Vmat30_105_bis.value = MyDist(vma_ms * 30 * 105  / 100);
 document.calc.Vmat30_110_bis.value = MyDist(vma_ms * 30 * 110  / 100);
 document.calc.Vmat30_115_bis.value = MyDist(vma_ms * 30 * 115  / 100);

 document.calc.Vmat115_kmh.value = Math.round( vma_value * 115 )/100;
 document.calc.Vmat110_kmh.value = Math.round( vma_value * 110 )/100;
 document.calc.Vmat105_kmh.value = Math.round( vma_value * 105 )/100;
 document.calc.Vmat100_kmh.value = Math.round( vma_value * 100 )/100;
 document.calc.Vmat95_kmh.value = Math.round( vma_value * 95 )/100;
 document.calc.Vmat90_kmh.value = Math.round( vma_value * 90 )/100;
 document.calc.Vmat85_kmh.value = Math.round( vma_value * 85 )/100;
 document.calc.Vmat80_kmh.value = Math.round( vma_value * 80 )/100;

 //  temps pour  100 m
 document.calc.Vmad100_60.value = MyTime(vma_100 / 60 * 100);
 document.calc.Vmad100_65.value = MyTime(vma_100 / 65 * 100);
 document.calc.Vmad100_70.value = MyTime(vma_100 / 70 * 100);
 document.calc.Vmad100_75.value = MyTime(vma_100 / 75 * 100);
 document.calc.Vmad100_80.value = MyTime(vma_100 / 80 * 100);
 document.calc.Vmad100_85.value = MyTime(vma_100 / 85 * 100);
 document.calc.Vmad100_90.value = MyTime(vma_100 / 90 * 100);
 document.calc.Vmad100_95.value = MyTime(vma_100 / 95 * 100);
 document.calc.Vmad100_100.value = MyTime(vma_100 / 100 * 100);
 document.calc.Vmad100_105.value = MyTime(vma_100 / 105 * 100);
 document.calc.Vmad100_110.value = MyTime(vma_100 / 110 * 100);
 document.calc.Vmad100_115.value = MyTime(vma_100 / 115 * 100);

 //  temps pour 200 m
 document.calc.Vmad200_60.value = MyTime(vma_100 / 60  * 200);
 document.calc.Vmad200_65.value = MyTime(vma_100 / 65  * 200);
 document.calc.Vmad200_70.value = MyTime(vma_100 / 70  * 200);
 document.calc.Vmad200_75.value = MyTime(vma_100 / 75  * 200);
 document.calc.Vmad200_80.value = MyTime(vma_100 / 80  * 200);
 document.calc.Vmad200_85.value = MyTime(vma_100 / 85  * 200);
 document.calc.Vmad200_90.value = MyTime(vma_100 / 90  * 200);
 document.calc.Vmad200_95.value = MyTime(vma_100 / 95  * 200);
 document.calc.Vmad200_100.value = MyTime(vma_100 / 100  * 200);
 document.calc.Vmad200_105.value = MyTime(vma_100 / 105  * 200);
 document.calc.Vmad200_110.value = MyTime(vma_100 / 110  * 200);
 document.calc.Vmad200_115.value = MyTime(vma_100 / 115  * 200);

 //  temps pour 300 m
 document.calc.Vmad300_60.value = MyTime(vma_100 / 60  * 300);
 document.calc.Vmad300_65.value = MyTime(vma_100 / 65  * 300);
 document.calc.Vmad300_70.value = MyTime(vma_100 / 70  * 300);
 document.calc.Vmad300_75.value = MyTime(vma_100 / 75  * 300);
 document.calc.Vmad300_80.value = MyTime(vma_100 / 80  * 300);
 document.calc.Vmad300_85.value = MyTime(vma_100 / 85  * 300);
 document.calc.Vmad300_90.value = MyTime(vma_100 / 90  * 300);
 document.calc.Vmad300_95.value = MyTime(vma_100 / 95  * 300);
 document.calc.Vmad300_100.value = MyTime(vma_100 / 100  * 300);
 document.calc.Vmad300_105.value = MyTime(vma_100 / 105  * 300);
 document.calc.Vmad300_110.value = MyTime(vma_100 / 110  * 300);
 document.calc.Vmad300_115.value = MyTime(vma_100 / 115  * 300);

//  temps pour 400 m
 document.calc.Vmad400_60.value = MyTime(vma_100 / 60  * 400);
 document.calc.Vmad400_65.value = MyTime(vma_100 / 65  * 400);
 document.calc.Vmad400_70.value = MyTime(vma_100 / 70  * 400);
 document.calc.Vmad400_75.value = MyTime(vma_100 / 75  * 400);
 document.calc.Vmad400_80.value = MyTime(vma_100 / 80  * 400);
 document.calc.Vmad400_85.value = MyTime(vma_100 / 85  * 400);
 document.calc.Vmad400_90.value = MyTime(vma_100 / 90  * 400);
 document.calc.Vmad400_95.value = MyTime(vma_100 / 95  * 400);
 document.calc.Vmad400_100.value = MyTime(vma_100 / 100  * 400);
 document.calc.Vmad400_105.value = MyTime(vma_100 / 105  * 400);
 document.calc.Vmad400_110.value = MyTime(vma_100 / 110  * 400);
 document.calc.Vmad400_115.value = MyTime(vma_100 / 115  * 400);

//  temps pour 500 m
 document.calc.Vmad500_60.value = MyTime(vma_100 / 60  * 500);
 document.calc.Vmad500_65.value = MyTime(vma_100 / 65  * 500);
 document.calc.Vmad500_70.value = MyTime(vma_100 / 70  * 500);
 document.calc.Vmad500_75.value = MyTime(vma_100 / 75  * 500);
 document.calc.Vmad500_80.value = MyTime(vma_100 / 80  * 500);
 document.calc.Vmad500_85.value = MyTime(vma_100 / 85  * 500);
 document.calc.Vmad500_90.value = MyTime(vma_100 / 90  * 500);
 document.calc.Vmad500_95.value = MyTime(vma_100 / 95  * 500);
 document.calc.Vmad500_100.value = MyTime(vma_100 / 100  * 500);
 document.calc.Vmad500_105.value = MyTime(vma_100 / 105  * 500);
 document.calc.Vmad500_110.value = MyTime(vma_100 / 110  * 500);
 document.calc.Vmad500_115.value = MyTime(vma_100 / 115  * 500);

//  temps pour 600 m
 document.calc.Vmad600_60.value = MyTime(vma_100 / 60  * 600);
 document.calc.Vmad600_65.value = MyTime(vma_100 / 65  * 600);
 document.calc.Vmad600_70.value = MyTime(vma_100 / 70  * 600);
 document.calc.Vmad600_75.value = MyTime(vma_100 / 75  * 600);
 document.calc.Vmad600_80.value = MyTime(vma_100 / 80  * 600);
 document.calc.Vmad600_85.value = MyTime(vma_100 / 85  * 600);
 document.calc.Vmad600_90.value = MyTime(vma_100 / 90  * 600);
 document.calc.Vmad600_95.value = MyTime(vma_100 / 95  * 600);
 document.calc.Vmad600_100.value = MyTime(vma_100 / 100  * 600);
 document.calc.Vmad600_105.value = MyTime(vma_100 / 105  * 600);
 document.calc.Vmad600_110.value = MyTime(vma_100 / 110  * 600);
 document.calc.Vmad600_115.value = MyTime(vma_100 / 115  * 600);

//  temps pour 800 m
 document.calc.Vmad800_60.value = MyTime(vma_100 / 60  * 800);
 document.calc.Vmad800_65.value = MyTime(vma_100 / 65  * 800);
 document.calc.Vmad800_70.value = MyTime(vma_100 / 70  * 800);
 document.calc.Vmad800_75.value = MyTime(vma_100 / 75  * 800);
 document.calc.Vmad800_80.value = MyTime(vma_100 / 80  * 800);
 document.calc.Vmad800_85.value = MyTime(vma_100 / 85  * 800);
 document.calc.Vmad800_90.value = MyTime(vma_100 / 90  * 800);
 document.calc.Vmad800_95.value = MyTime(vma_100 / 95  * 800);
 document.calc.Vmad800_100.value = MyTime(vma_100 / 100  * 800);
 document.calc.Vmad800_105.value = MyTime(vma_100 / 105  * 800);
 document.calc.Vmad800_110.value = MyTime(vma_100 / 110  * 800);
 document.calc.Vmad800_115.value = MyTime(vma_100 / 115  * 800);

//  temps pour 1000 m
 document.calc.Vmad1000_60.value = MyTime(vma_100 / 60  * 1000);
 document.calc.Vmad1000_65.value = MyTime(vma_100 / 65  * 1000);
 document.calc.Vmad1000_70.value = MyTime(vma_100 / 70  * 1000);
 document.calc.Vmad1000_75.value = MyTime(vma_100 / 75  * 1000);
 document.calc.Vmad1000_80.value = MyTime(vma_100 / 80  * 1000);
 document.calc.Vmad1000_85.value = MyTime(vma_100 / 85  * 1000);
 document.calc.Vmad1000_90.value = MyTime(vma_100 / 90  * 1000);
 document.calc.Vmad1000_95.value = MyTime(vma_100 / 95  * 1000);
 document.calc.Vmad1000_100.value = MyTime(vma_100 / 100  * 1000);
 document.calc.Vmad1000_105.value = MyTime(vma_100 / 105  * 1000);
 document.calc.Vmad1000_110.value = MyTime(vma_100 / 110  * 1000);
 document.calc.Vmad1000_115.value = MyTime(vma_100 / 115  * 1000);

//  temps pour 1200 m
 document.calc.Vmad1200_60.value = MyTime(vma_100 / 60  * 1200);
 document.calc.Vmad1200_65.value = MyTime(vma_100 / 65  * 1200);
 document.calc.Vmad1200_70.value = MyTime(vma_100 / 70  * 1200);
 document.calc.Vmad1200_75.value = MyTime(vma_100 / 75  * 1200);
 document.calc.Vmad1200_80.value = MyTime(vma_100 / 80  * 1200);
 document.calc.Vmad1200_85.value = MyTime(vma_100 / 85  * 1200);
 document.calc.Vmad1200_90.value = MyTime(vma_100 / 90  * 1200);
 document.calc.Vmad1200_95.value = MyTime(vma_100 / 95  * 1200);
 document.calc.Vmad1200_100.value = MyTime(vma_100 / 100  * 1200);
 document.calc.Vmad1200_105.value = MyTime(vma_100 / 105  * 1200);
 document.calc.Vmad1200_110.value = MyTime(vma_100 / 110  * 1200);
 document.calc.Vmad1200_115.value = MyTime(vma_100 / 115  * 1200);

//  temps pour 1500 m
 document.calc.Vmad1500_60.value = MyTime(vma_100 / 60  * 1500);
 document.calc.Vmad1500_65.value = MyTime(vma_100 / 65  * 1500);
 document.calc.Vmad1500_70.value = MyTime(vma_100 / 70  * 1500);
 document.calc.Vmad1500_75.value = MyTime(vma_100 / 75  * 1500);
 document.calc.Vmad1500_80.value = MyTime(vma_100 / 80  * 1500);
 document.calc.Vmad1500_85.value = MyTime(vma_100 / 85  * 1500);
 document.calc.Vmad1500_90.value = MyTime(vma_100 / 90  * 1500);
 document.calc.Vmad1500_95.value = MyTime(vma_100 / 95  * 1500);
 document.calc.Vmad1500_100.value = MyTime(vma_100 / 100  * 1500);
 document.calc.Vmad1500_105.value = MyTime(vma_100 / 105  * 1500);
 document.calc.Vmad1500_110.value = MyTime(vma_100 / 110  * 1500);
 document.calc.Vmad1500_115.value = MyTime(vma_100 / 115  * 1500);

//  temps pour 2000 m
 document.calc.Vmad2000_60.value = MyTime(vma_100 / 60  * 2000);
 document.calc.Vmad2000_65.value = MyTime(vma_100 / 65  * 2000);
 document.calc.Vmad2000_70.value = MyTime(vma_100 / 70  * 2000);
 document.calc.Vmad2000_75.value = MyTime(vma_100 / 75  * 2000);
 document.calc.Vmad2000_80.value = MyTime(vma_100 / 80  * 2000);
 document.calc.Vmad2000_85.value = MyTime(vma_100 / 85  * 2000);
 document.calc.Vmad2000_90.value = MyTime(vma_100 / 90  * 2000);
 document.calc.Vmad2000_95.value = MyTime(vma_100 / 95  * 2000);
 document.calc.Vmad2000_100.value = MyTime(vma_100 / 100  * 2000);
 document.calc.Vmad2000_105.value = MyTime(vma_100 / 105  * 2000);
 document.calc.Vmad2000_110.value = MyTime(vma_100 / 110  * 2000);
 document.calc.Vmad2000_115.value = MyTime(vma_100 / 115  * 2000);

//  temps pour 3000 m
 document.calc.Vmad3000_60.value = MyTime(vma_100 / 60  * 3000);
 document.calc.Vmad3000_65.value = MyTime(vma_100 / 65  * 3000);
 document.calc.Vmad3000_70.value = MyTime(vma_100 / 70  * 3000);
 document.calc.Vmad3000_75.value = MyTime(vma_100 / 75  * 3000);
 document.calc.Vmad3000_80.value = MyTime(vma_100 / 80  * 3000);
 document.calc.Vmad3000_85.value = MyTime(vma_100 / 85  * 3000);
 document.calc.Vmad3000_90.value = MyTime(vma_100 / 90  * 3000);
 document.calc.Vmad3000_95.value = MyTime(vma_100 / 95  * 3000);
 document.calc.Vmad3000_100.value = MyTime(vma_100 / 100  * 3000);
 document.calc.Vmad3000_105.value = MyTime(vma_100 / 105  * 3000);
 document.calc.Vmad3000_110.value = MyTime(vma_100 / 110  * 3000);
 document.calc.Vmad3000_115.value = MyTime(vma_100 / 115  * 3000);


 //  distance pour 30''
 document.calc.Vmat30_60.value = MyDist(vma_ms * 30 * 60  / 100);
 document.calc.Vmat30_65.value = MyDist(vma_ms * 30 * 65  / 100);
 document.calc.Vmat30_70.value = MyDist(vma_ms * 30 * 70  / 100);
 document.calc.Vmat30_75.value = MyDist(vma_ms * 30 * 75  / 100);
 document.calc.Vmat30_80.value = MyDist(vma_ms * 30 * 80  / 100);
 document.calc.Vmat30_85.value = MyDist(vma_ms * 30 * 85  / 100);
 document.calc.Vmat30_90.value = MyDist(vma_ms * 30 * 90  / 100);
 document.calc.Vmat30_95.value = MyDist(vma_ms * 30 * 95  / 100);
 document.calc.Vmat30_100.value = MyDist(vma_ms * 30 * 100  / 100);
 document.calc.Vmat30_105.value = MyDist(vma_ms * 30 * 105  / 100);
 document.calc.Vmat30_110.value = MyDist(vma_ms * 30 * 110  / 100);
 document.calc.Vmat30_115.value = MyDist(vma_ms * 30 * 115  / 100);

 //  distance pour 45''
 document.calc.Vmat45_60.value = MyDist(vma_ms * 45 * 60  / 100);
 document.calc.Vmat45_65.value = MyDist(vma_ms * 45 * 65  / 100);
 document.calc.Vmat45_70.value = MyDist(vma_ms * 45 * 70  / 100);
 document.calc.Vmat45_75.value = MyDist(vma_ms * 45 * 75  / 100);
 document.calc.Vmat45_80.value = MyDist(vma_ms * 45 * 80  / 100);
 document.calc.Vmat45_85.value = MyDist(vma_ms * 45 * 85  / 100);
 document.calc.Vmat45_90.value = MyDist(vma_ms * 45 * 90  / 100);
 document.calc.Vmat45_95.value = MyDist(vma_ms * 45 * 95  / 100);
 document.calc.Vmat45_100.value = MyDist(vma_ms * 45 * 100  / 100);
 document.calc.Vmat45_105.value = MyDist(vma_ms * 45 * 105  / 100);
 document.calc.Vmat45_110.value = MyDist(vma_ms * 45 * 110  / 100);
 document.calc.Vmat45_115.value = MyDist(vma_ms * 45 * 115  / 100);

 //  distance pour 60''
 document.calc.Vmat60_60.value = MyDist(vma_ms * 60 * 60  / 100);
 document.calc.Vmat60_65.value = MyDist(vma_ms * 60 * 65  / 100);
 document.calc.Vmat60_70.value = MyDist(vma_ms * 60 * 70  / 100);
 document.calc.Vmat60_75.value = MyDist(vma_ms * 60 * 75  / 100);
 document.calc.Vmat60_80.value = MyDist(vma_ms * 60 * 80  / 100);
 document.calc.Vmat60_85.value = MyDist(vma_ms * 60 * 85  / 100);
 document.calc.Vmat60_90.value = MyDist(vma_ms * 60 * 90  / 100);
 document.calc.Vmat60_95.value = MyDist(vma_ms * 60 * 95  / 100);
 document.calc.Vmat60_100.value = MyDist(vma_ms * 60 * 100  / 100);
 document.calc.Vmat60_105.value = MyDist(vma_ms * 60 * 105  / 100);
 document.calc.Vmat60_110.value = MyDist(vma_ms * 60 * 110  / 100);
 document.calc.Vmat60_115.value = MyDist(vma_ms * 60 * 115  / 100);

 //  distance pour 75''
 document.calc.Vmat75_60.value = MyDist(vma_ms * 75 * 60  / 100);
 document.calc.Vmat75_65.value = MyDist(vma_ms * 75 * 65  / 100);
 document.calc.Vmat75_70.value = MyDist(vma_ms * 75 * 70  / 100);
 document.calc.Vmat75_75.value = MyDist(vma_ms * 75 * 75  / 100);
 document.calc.Vmat75_80.value = MyDist(vma_ms * 75 * 80  / 100);
 document.calc.Vmat75_85.value = MyDist(vma_ms * 75 * 85  / 100);
 document.calc.Vmat75_90.value = MyDist(vma_ms * 75 * 90  / 100);
 document.calc.Vmat75_95.value = MyDist(vma_ms * 75 * 95  / 100);
 document.calc.Vmat75_100.value = MyDist(vma_ms * 75 * 100  / 100);
 document.calc.Vmat75_105.value = MyDist(vma_ms * 75 * 105  / 100);
 document.calc.Vmat75_110.value = MyDist(vma_ms * 75 * 110  / 100);
 document.calc.Vmat75_115.value = MyDist(vma_ms * 75 * 115  / 100);

 //  distance pour 90''
 document.calc.Vmat90_60.value = MyDist(vma_ms * 90 * 60  / 100);
 document.calc.Vmat90_65.value = MyDist(vma_ms * 90 * 65  / 100);
 document.calc.Vmat90_70.value = MyDist(vma_ms * 90 * 70  / 100);
 document.calc.Vmat90_75.value = MyDist(vma_ms * 90 * 75  / 100);
 document.calc.Vmat90_80.value = MyDist(vma_ms * 90 * 80  / 100);
 document.calc.Vmat90_85.value = MyDist(vma_ms * 90 * 85  / 100);
 document.calc.Vmat90_90.value = MyDist(vma_ms * 90 * 90  / 100);
 document.calc.Vmat90_95.value = MyDist(vma_ms * 90 * 95  / 100);
 document.calc.Vmat90_100.value = MyDist(vma_ms * 90 * 100  / 100);
 document.calc.Vmat90_105.value = MyDist(vma_ms * 90 * 105  / 100);
 document.calc.Vmat90_110.value = MyDist(vma_ms * 90 * 110  / 100);
 document.calc.Vmat90_115.value = MyDist(vma_ms * 90 * 115  / 100);

 //  distance pour 120''
 document.calc.Vmat120_60.value = MyDist(vma_ms * 120 * 60  / 100);
 document.calc.Vmat120_65.value = MyDist(vma_ms * 120 * 65  / 100);
 document.calc.Vmat120_70.value = MyDist(vma_ms * 120 * 70  / 100);
 document.calc.Vmat120_75.value = MyDist(vma_ms * 120 * 75  / 100);
 document.calc.Vmat120_80.value = MyDist(vma_ms * 120 * 80  / 100);
 document.calc.Vmat120_85.value = MyDist(vma_ms * 120 * 85  / 100);
 document.calc.Vmat120_90.value = MyDist(vma_ms * 120 * 90  / 100);
 document.calc.Vmat120_95.value = MyDist(vma_ms * 120 * 95  / 100);
 document.calc.Vmat120_100.value = MyDist(vma_ms * 120 * 100  / 100);
 document.calc.Vmat120_105.value = MyDist(vma_ms * 120 * 105  / 100);
 document.calc.Vmat120_110.value = MyDist(vma_ms * 120 * 110  / 100);
 document.calc.Vmat120_115.value = MyDist(vma_ms * 120 * 115  / 100);

 //  distance pour 150''
 document.calc.Vmat150_60.value = MyDist(vma_ms * 150 * 60  / 100);
 document.calc.Vmat150_65.value = MyDist(vma_ms * 150 * 65  / 100);
 document.calc.Vmat150_70.value = MyDist(vma_ms * 150 * 70  / 100);
 document.calc.Vmat150_75.value = MyDist(vma_ms * 150 * 75  / 100);
 document.calc.Vmat150_80.value = MyDist(vma_ms * 150 * 80  / 100);
 document.calc.Vmat150_85.value = MyDist(vma_ms * 150 * 85  / 100);
 document.calc.Vmat150_90.value = MyDist(vma_ms * 150 * 90  / 100);
 document.calc.Vmat150_95.value = MyDist(vma_ms * 150 * 95  / 100);
 document.calc.Vmat150_100.value = MyDist(vma_ms * 150 * 100  / 100);
 document.calc.Vmat150_105.value = MyDist(vma_ms * 150 * 105  / 100);
 document.calc.Vmat150_110.value = MyDist(vma_ms * 150 * 110  / 100);
 document.calc.Vmat150_115.value = MyDist(vma_ms * 150 * 115  / 100);

 //  distance pour 180''
 document.calc.Vmat180_60.value = MyDist(vma_ms * 180 * 60  / 100);
 document.calc.Vmat180_65.value = MyDist(vma_ms * 180 * 65  / 100);
 document.calc.Vmat180_70.value = MyDist(vma_ms * 180 * 70  / 100);
 document.calc.Vmat180_75.value = MyDist(vma_ms * 180 * 75  / 100);
 document.calc.Vmat180_80.value = MyDist(vma_ms * 180 * 80  / 100);
 document.calc.Vmat180_85.value = MyDist(vma_ms * 180 * 85  / 100);
 document.calc.Vmat180_90.value = MyDist(vma_ms * 180 * 90  / 100);
 document.calc.Vmat180_95.value = MyDist(vma_ms * 180 * 95  / 100);
 document.calc.Vmat180_100.value = MyDist(vma_ms * 180 * 100  / 100);
 document.calc.Vmat180_105.value = MyDist(vma_ms * 180 * 105  / 100);
 document.calc.Vmat180_110.value = MyDist(vma_ms * 180 * 110  / 100);
 document.calc.Vmat180_115.value = MyDist(vma_ms * 180 * 115  / 100);

 //  distance pour 240''
 document.calc.Vmat240_60.value = MyDist(vma_ms * 240 * 60  / 100);
 document.calc.Vmat240_65.value = MyDist(vma_ms * 240 * 65  / 100);
 document.calc.Vmat240_70.value = MyDist(vma_ms * 240 * 70  / 100);
 document.calc.Vmat240_75.value = MyDist(vma_ms * 240 * 75  / 100);
 document.calc.Vmat240_80.value = MyDist(vma_ms * 240 * 80  / 100);
 document.calc.Vmat240_85.value = MyDist(vma_ms * 240 * 85  / 100);
 document.calc.Vmat240_90.value = MyDist(vma_ms * 240 * 90  / 100);
 document.calc.Vmat240_95.value = MyDist(vma_ms * 240 * 95  / 100);
 document.calc.Vmat240_100.value = MyDist(vma_ms * 240 * 100  / 100);
 document.calc.Vmat240_105.value = MyDist(vma_ms * 240 * 105  / 100);
 document.calc.Vmat240_110.value = MyDist(vma_ms * 240 * 110  / 100);
 document.calc.Vmat240_115.value = MyDist(vma_ms * 240 * 115  / 100);

 //  distance pour 300''
 document.calc.Vmat300_60.value = MyDist(vma_ms * 300 * 60  / 100);
 document.calc.Vmat300_65.value = MyDist(vma_ms * 300 * 65  / 100);
 document.calc.Vmat300_70.value = MyDist(vma_ms * 300 * 70  / 100);
 document.calc.Vmat300_75.value = MyDist(vma_ms * 300 * 75  / 100);
 document.calc.Vmat300_80.value = MyDist(vma_ms * 300 * 80  / 100);
 document.calc.Vmat300_85.value = MyDist(vma_ms * 300 * 85  / 100);
 document.calc.Vmat300_90.value = MyDist(vma_ms * 300 * 90  / 100);
 document.calc.Vmat300_95.value = MyDist(vma_ms * 300 * 95  / 100);
 document.calc.Vmat300_100.value = MyDist(vma_ms * 300 * 100  / 100);
 document.calc.Vmat300_105.value = MyDist(vma_ms * 300 * 105  / 100);
 document.calc.Vmat300_110.value = MyDist(vma_ms * 300 * 110  / 100);
 document.calc.Vmat300_115.value = MyDist(vma_ms * 300 * 115  / 100);

 //  distance pour 600''
 document.calc.Vmat600_60.value = MyDist(vma_ms * 600 * 60  / 100);
 document.calc.Vmat600_65.value = MyDist(vma_ms * 600 * 65  / 100);
 document.calc.Vmat600_70.value = MyDist(vma_ms * 600 * 70  / 100);
 document.calc.Vmat600_75.value = MyDist(vma_ms * 600 * 75  / 100);
 document.calc.Vmat600_80.value = MyDist(vma_ms * 600 * 80  / 100);
 document.calc.Vmat600_85.value = MyDist(vma_ms * 600 * 85  / 100);
 document.calc.Vmat600_90.value = MyDist(vma_ms * 600 * 90  / 100);
 document.calc.Vmat600_95.value = MyDist(vma_ms * 600 * 95  / 100);
 document.calc.Vmat600_100.value = MyDist(vma_ms * 600 * 100  / 100);
 document.calc.Vmat600_105.value = MyDist(vma_ms * 600 * 105  / 100);
 document.calc.Vmat600_110.value = MyDist(vma_ms * 600 * 110  / 100);
 document.calc.Vmat600_115.value = MyDist(vma_ms * 600 * 115  / 100);

 //  distance pour 900''
 document.calc.Vmat900_60.value = MyDist(vma_ms * 900 * 60  / 100);
 document.calc.Vmat900_65.value = MyDist(vma_ms * 900 * 65  / 100);
 document.calc.Vmat900_70.value = MyDist(vma_ms * 900 * 70  / 100);
 document.calc.Vmat900_75.value = MyDist(vma_ms * 900 * 75  / 100);
 document.calc.Vmat900_80.value = MyDist(vma_ms * 900 * 80  / 100);
 document.calc.Vmat900_85.value = MyDist(vma_ms * 900 * 85  / 100);
 document.calc.Vmat900_90.value = MyDist(vma_ms * 900 * 90  / 100);
 document.calc.Vmat900_95.value = MyDist(vma_ms * 900 * 95  / 100);
 document.calc.Vmat900_100.value = MyDist(vma_ms * 900 * 100  / 100);
 document.calc.Vmat900_105.value = MyDist(vma_ms * 900 * 105  / 100);
 document.calc.Vmat900_110.value = MyDist(vma_ms * 900 * 110  / 100);
 document.calc.Vmat900_115.value = MyDist(vma_ms * 900 * 115  / 100);

}

// -->
