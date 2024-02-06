import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import Button from '../../src/components/Button';
import CheckBox from '@react-native-community/checkbox';

export default function Privacy({navigation, route}) {
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        setIsChecked(route.params.isChecked)
    }, [])
    return (
        <SafeAreaView>
            <StatusBar translucent={false} barStyle={'dark-content'}/>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.containerStyle}>
                <Text style={styles.title}>Política de privacitat</Text>
                <Text style={styles.paragraph}>
                    Termes i condicions d'ús
                    Termes i Condicions regulen la descàrrega, l’accés i l’ús de l’aplicació mòbil l’APLICACIÓ,
                    MEDISTORIS posa a disposició dels usuaris. L’usuari adquireix aquesta condició en el moment de
                    descarregar-la i fer-ne ús.

                    Aquesta versió de l’APLICACIÓ està disponible de forma gratuïta a Google Play i Apple Store. L’accés
                    a l’APLICACIÓ comporta que l’usuari reconeix haver acceptat i consentit sense reserves aquestes
                    condicions d’ús.

                </Text>
                <Text style={styles.paragraphTitle}>
                    1. OBJECTE
                </Text>
                <Text style={styles.paragraph}>

                    L’APLICACIÓ es de contingut GRATUÏT i té l’objectiu d’apropar i divulgar la Cultura Catalana d’una
                    forma innovadora i amb la finalitat d’arribar a tot tipus de públic, entitats, escoles i instituts,
                    oferint àudios immersius de Cultura Catalana apropant les tecnologies Immersives a tothom,
                    disminuint l'escletxa digital.
                    Projecte amb compromís social, col·laborant amb diversos col·lectius i entitats per potenciar la
                    llengua i Cultura Catalana d’una forma amigable i amb contingut de qualitat.
                    Aquesta APLICACIÓ que es posa a disposició dels usuaris per al seu ús personal (mai empresarial).
                    Funciona en tauletes i en un telèfon mòbil amb sistema operatiu Android o IOS. De moment sense ús de
                    càmera frontal.

                </Text>
                <Text style={styles.paragraphTitle}>
                    2. FUNCIONALITATS
                </Text>
                <Text style={styles.paragraph}>

                    Per a usuaris anònims: un usuari anònim pot accedir a totes les funcionalitats menys alguns Àudios
                    Prèmium.
                    Per a usuaris registrats: Tindran accés a escoltar Àudios de BIOGRAFIES, HISTÒRIES i LLEGENDES
                    catalanes, DITES i refranys, Sons de Cultura Catalana i CANÇONS POPULARS CATALANES (veu sense
                    música).
                    Es podran veure en Realitat Augmentada imatges relacionades amb algunes de les històries i
                    llegendes, biografies.
                    Es podrà veure un vídeo demo d’una sala al Metavers, amb accés directe clicant al METAVERS del
                    Catvers en aquesta sala en concret, per visitar una sala de relaxació i cultura Catalana. Avisant
                    que si clica sortirà de l’aplicació.

                    L’aplicació tractarà les dades únicament quan s’està executant per acció de l’usuari en primer pla.

                    Es facilita a l’usuari informació relativa a la manera en què pot gestionar els permisos atorgats a
                    l’aplicació de manera que podrà decidir en tot moment si decideix atorgar o revocar aquests
                    permisos, o en quines condicions els atorga.

                </Text>
                <Text style={styles.paragraphTitle}>
                    3. DRETS DE PROPIETAT INTEL·LECTUAL I INDUSTRIAL
                </Text>
                <Text style={styles.paragraph}>

                    Els drets de propietat intel·lectual i industrial sobre l’APLICACIÓ són titularitat de MEDISTORIS, a
                    qui correspon l’exercici exclusiu dels drets d’explotació en qualsevol forma i, en especial, els
                    drets de reproducció, distribució, comunicació pública i transformació.
                    Els tercers titulars de drets de propietat intel·lectual i industrial sobre fotografies, logotips i
                    qualsevol símbol o contingut inclòs en l’APLICACIÓ han concedit les autoritzacions corresponents per
                    a la seva reproducció, distribució i posada a disposició del públic.
                    L’usuari reconeix que la reproducció, modificació, distribució, comercialització, descompilació,
                    desassemblatge, utilització de tècniques d’enginyeria inversa o de qualsevol altre mitjà per a
                    obtenir el codi font, la transformació o la publicació de qualsevol resultat de proves de
                    referències no autoritzades de qualsevol dels elements i utilitats integrades dins el
                    desenvolupament constitueix una infracció dels drets de propietat intel·lectual de MEDISTORIS, i es
                    compromet, en conseqüència, a no efectuar cap de les accions esmentades.

                </Text>
                <Text style={styles.paragraphTitle}>
                    4. POLÍTICA DE PRIVACITAT
                </Text>
                <Text style={styles.paragraph}>

                    Qui és el responsable del tractament de les seves dades personals?
                    MEDISTORIS.cat. és el responsable del tractament de les dades personals de l’usuari i l’informa que
                    aquestes dades es tractaran de conformitat amb el que estableix el Reglament (UE) 2016/679, de 27
                    d’abril (GDPR), i la Llei Orgànica 3/2018, de 5 de desembre (LOPDGDD), per la qual cosa se li
                    facilita la següent informació del tractament:

                    Perquè tractem les seves dades personals?
                    Tractem les seves dades personals per a les finalitats descrites en l’apartat «1. OBJECTE »
                    d’aquests termes i condicions, és a dir, es demanarà només el nom de l’usuari per personalitzar
                    l’aplicació a l’inici i per si ha alguna notificació d’avís. Que l’usuari pugui fer una captura d’un
                    certificat - logro amb el seu nom. Per altre banda en cas de subscripció pagant quota el Mail per
                    enviament de mails informatius i publicitaris si dona el consentiment. Demanar que posi ressenya. El
                    gènere per dirigir de forma personalitzada. Inclosa, entre d’altres, informació sobre: El nom, Mail
                    en cas de que facin subscripció de pagament i de fer compra de meditació o en cas d’empreses que
                    contractin serveis de meditacions, nom empresa, adreça, Mail, NIF, telèfon, gènere.
                    Per quin motiu podem tractar les seves dades personals?

                    El tractament de les seves dades està legitimat segons:

                    Ser necessari per a la relació contractual, de la qual sou part, que suposa l’acceptació d’aquests
                    termes i condicions d’ús (art. 6.1.b GDPR).
                    El seu consentiment atorgat per a una o diverses finalitats específiques (article 6.1.a GDPR) en
                    emplenar qualsevol dels formularis i/o formes de contacte que posem a la seva disposició en aquesta
                    APLICACIÓ i marcar la casella habilitada amb aquesta finalitat.
                    El nostre interès legítim en el cas de donar resposta a les seves sol·licituds o encàrrecs
                    realitzats a través de qualsevol dels formularis i/o formes de contacte que posem a la seva
                    disposició en l’APLICACIÓ (article 6.1.f GDPR)

                    Durant quant de temps guardarem les seves dades personals?
                    Conservarem les seves dades personals durant no més temps del necessari per mantenir la finalitat
                    del tractament, és a dir, mentre duri la relació contractual objecte de l’ús de l’APLICACIÓ (inclosa
                    l’obligació de conservar-les durant els terminis de prescripció aplicables), i quan ja no siguin
                    necessàries per a aquesta finalitat, se suprimiran amb mesures de seguretat adequades per garantir
                    que les dades siguin anonimitzades o totalment destruïdes.

                    A qui facilitem les seves dades personals?
                    Les seves dades personals es comunicaran a:
                    Les Administracions Públiques i altres entitats privades per al compliment de les obligacions legals
                    a què MEDISTORIS està subjecte per les seves activitats.
                    Els proveïdors que necessitin accedir a les dades personals de l’usuari per proporcionar els serveis
                    que MEDISTORIS els hagi contractat, o que pel propi funcionament dels serveis electrònics
                    (aplicació, pàgina web i correus electrònics) puguin tenir accés a determinades dades personals.
                    MEDISTORIS ha formalitzat amb tots ells contractes de confidencialitat i d’encàrrec de tractament de
                    dades personals necessaris i exigits per la normativa per protegir la seva privacitat (article 28.3
                    GDPR).

                    El registre i el control d’algunes sessions d’usuari s’efectuen mitjançant la plataforma Firebase
                    Authentication de Google, allotjant part dels àudios en un servidor extern.

                    L’APLICACIÓ utilitza Google Analytics com a eina per conèixer-ne l’ús i les tendències d’interacció.
                    MEDISTORIS podrà utilitzar la informació personal que ens faciliti de manera dissociada (sense
                    identificació personal) per a finalitats internes, com ara l’elaboració d’estadístiques.

                    L’APLICACIÓ podrà recollir, emmagatzemar o acumular determinada informació de caràcter no personal
                    en relació amb el seu ús. Google Analytics es regeix per les condicions generals de Google
                    accessibles a http://www.google.com/analytics/terms/es.html i les polítiques de privacitat de Google
                    accessibles a https://www.google.es/intl/es/policies/privacy/. Per desactivar Google Analytics:
                    https://support.google.com/analytics/answer/1009696?hl=es

                    ¿Quins són els drets de l’usuari?
                    Dret a retirar el consentiment en qualsevol moment.
                    Dret d’accés, rectificació, portabilitat i supressió de les seves dades i de limitació o oposició al
                    seu tractament. Dret a presentar una reclamació davant l’autoritat de control (www.aepd.es) si
                    considera que el tractament no s’ajusta a la normativa vigent.

                    Dades de contacte per exercir els seus drets:
                    MEDISTORIS. Apartat de correus Nº 25 - 08340 Vilassar de Mar (Barcelona). E-mail: app@medistoris.cat

                </Text>
                <Text style={styles.paragraphTitle}>
                    5. CARÀCTER OBLIGATORI O FACULTATIU DE LA INFORMACIÓ FACILITADA PER L’USUARI
                </Text>
                <Text style={styles.paragraph}>

                    Els usuaris, per mitjà de les caselles corresponents i la introducció de dades en els camps, marcats
                    amb un asterisc (*) en els formularis de l’APLICACIÓ, accepten expressament i de manera lliure i
                    inequívoca, que les seves dades personals són necessàries per atendre la seva petició, per part del
                    prestador, i que per tant la inclusió de les dades en els camps restants és voluntària. L’usuari
                    garanteix que les dades personals facilitades a MEDISTORIS són verídiques i es fa responsable de
                    comunicar-ne qualsevol modificació.

                    MEDISTORIS informa que totes les dades sol·licitades a través de l’APLICACIÓ són obligatòries, ja
                    que són necessàries per proporcionar un servei òptim a l’Usuari. En cas que no es facilitin totes
                    les dades, no es garanteix que la informació i serveis facilitats s’ajustin completament a les seves
                    necessitats.

                </Text>
                <Text style={styles.paragraphTitle}>
                    6. MESURES DE SEGURETAT
                </Text>
                <Text style={styles.paragraph}>

                    De conformitat amb el que estableixen les normatives vigents en protecció de dades personals, el
                    RESPONSABLE està complint amb totes les disposicions de les normatives GDPR i LOPDGDD per al
                    tractament de les dades personals de la seva responsabilitat, i manifestament amb els principis
                    descrits a l’article 5 del GDPR, pels quals es tracten de manera lícita, lleial i transparent en
                    relació amb l’interessat i adequades, pertinents i limitades al que és necessari en relació amb les
                    finalitats per a les quals es tracten.
                    MEDISTORIS garanteix que ha implementat polítiques tècniques i organitzatives apropiades per aplicar
                    les mesures de seguretat que estableixen el GDPR i la LOPDGDD, amb la finalitat de protegir els
                    drets i llibertats dels usuaris i els ha comunicat la informació adequada perquè puguin exercir-los.

                    Qualsevol transferència d’informació que l’APLICACIÓ efectua amb servidors al núvol (cloud), propis
                    o de tercers, es fa de manera xifrada i segura a través d’un protocol segur de transferència
                    d’hipertext (HTTPS), que a més garanteix que la informació no pugui ser interceptada.

                    Es faran còpies de seguretat enmagatzemades en servidors locals i amb les dades xifrades.

                    Per a més informació sobre les garanties de la seva privacitat, pot adreçar-se a MEDISTORIS a través
                    de www.medistoris.cat.

                </Text>
                <Text style={styles.paragraphTitle}>
                    7. EXCLUSIÓ DE RESPONSABILITAT
                </Text>
                <Text style={styles.paragraph}>

                    MEDISTORIS es reserva el dret d’editar, actualitzar, modificar, suspendre, eliminar o finalitzar els
                    serveis que ofereix l’APLICACIÓ, inclòs tot o part del seu contingut, sense necessitat d’avís previ,
                    i de modificar-ne la forma o tipus d’accés.

                    Les possibles causes de modificació poden tenir lloc per motius com ara la seva adaptació a les
                    possibles novetats legislatives i canvis en la pròpia APLICACIÓ, així com aquelles que es puguin
                    derivar dels codis tipus existents en la matèria o per motius estratègics o corporatius.
                    MEDISTORIS no es fa responsable de l’ús de l’APLICACIÓ que fa un menor d’edat, ja que la descàrrega
                    i l’ús de l’APLICACIÓ són responsabilitat exclusiva de l’usuari.

                    L’APLICACIÓ es mostra «tal com és» i sense cap tipus de garantia. MEDISTORIS no es fa responsable de
                    la qualitat final de l’APLICACIÓ ni del fet que aquesta serveixi i compleixi amb tots els seus
                    objectius. Això no obstant, MEDISTORIS es compromet en la mesura de les seves possibilitats a
                    contribuir a millorar la qualitat de l’APLICACIÓ, però no en garanteix ni la precisió ni
                    l’actualitat del contingut.

                    La responsabilitat d’ús de l’APLICACIÓ correspon únicament a l’usuari. Tret del que s’estableix en
                    aquests Termes i Condicions, MEDISTORIS no és responsable de cap pèrdua o dany que es produeixi en
                    relació amb la descàrrega o l’ús de l’APLICACIÓ, com ara els que s’hagin produït com a conseqüència
                    de fallades, avaries o bloquejos en el funcionament de l’APLICACIÓ (per exemple, i sense caràcter
                    limitatiu: error en les línies de comunicacions, defectes en el hardware o software de l’APLICACIÓ o
                    fallades en la xarxa d’Internet). De la mateixa manera, MEDISTORIS tampoc és responsable dels danys
                    produïts com a conseqüència d’un ús indegut o inadequat de l’APLICACIÓ per part dels usuaris.

                </Text>
                <Text style={styles.paragraphTitle}>
                    8. LEGISLACIÓ I JURISDICCIÓ
                </Text>
                <Text style={styles.paragraph}>

                    L’usuari accepta que la legislació aplicable i els Jutjats i Tribunals competents per a conèixer les
                    divergències derivades de la interpretació o aplicació d’aquest conjunt de clàusules són els
                    espanyols, i es sotmet, renunciant expressament a qualsevol altra jurisdicció, als jutjats i
                    tribunals més propers a la ciutat de Mataró.

                </Text>
                <View style={{flexDirection: 'row', marginVertical: 6, alignItems: 'center', width: '100%'}}>
                    <CheckBox
                        style={{marginRight: 8, display: "flex"}}
                        value={isChecked}
                        onValueChange={setIsChecked}
                    />
                    <Text numberOfLines={2} style={{display: 'flex', flex: 1}}>He llegit i accepto les condicions d’ús de l’APLICACIÓ.</Text>
                </View>

                <Button
                    title="Registra't"
                    onPress={() => {
                        if (isChecked) {
                            navigation.navigate('SignupScreen', {isChecked: isChecked});
                        } else {
                            alert("Has d'acceptar la política de privacitat");
                        }
                    }}
                    style={{
                        marginTop: 22,
                        width: '100%',
                    }}
                    disabled={!isChecked}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    containerStyle: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 50,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 17,
        marginBottom: 15,
        lineHeight: 25,
    },
    paragraphTitle: {
        fontSize: 17,
        marginBottom: 15,
        fontWeight: 'bold',
        lineHeight: 25,
    },
});
