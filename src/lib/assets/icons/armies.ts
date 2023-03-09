import sororitas from './sororitas.svg';
import custodes from './custodes.svg';
import admech from './admech.svg'
import militarum from './militarum.svg'
import greyKnights from './grey-knights.svg'
import knights from './knights.svg'
import spaceMarines from './spacemarines.svg'
import titans from './titans.svg'
import demons from './chaos-demons.svg'
import csm from './csm.svg'
import deathGuard from './death-guard.svg'
import chaosKnights from './chaos-knigts.svg'
import thousandSons from './thoudan-sons.svg'
import aeldari from './aeldari.svg'
import drukahri from './drukhari.svg'
import genestealers from './genestealers.svg'
import necrons from './necrons.svg'
import orks from './orks.svg'
import tau from './tau.svg'
import nids from './nids.svg'
import votann from './votann.png'


export interface Army {
  name: string;
  icon: string;
  colors?: {
    iconColor?: string;
    activeColor?: string;
    activeBg?: string;
    inactiveColor?: string;
    inactiveBg?: string;
    goneOverColor?: string;
    goneOverBg?: string;
  }
}

export const armies: Army[] = [
  {name: "Adepta Sororitas", icon: sororitas, colors: {activeBg: "#800", iconColor: 'white'}},
  {name: "Adeptus Custodes", icon: custodes},
  {name: "Adeptus Mechanicus", icon: admech},
  {name: "Astra Militarum", icon: militarum},
  {name: "Grey Knights", icon: greyKnights},
  {name: "Imperial Knights", icon: knights},
  {name: "Space Marines", icon: spaceMarines},
  {name: "Titan Legions", icon: titans},
  {name: "Chaos Daemons", icon: demons},
  {name: "Chaos Knights", icon: chaosKnights},
  {name: "Chaos Space Marines", icon: csm},
  {name: "Death Guard", icon: deathGuard},
  {name: "Heretic Titan Legions", icon: chaosKnights},
  {name: "Thousand Sons", icon: thousandSons},
  {name: "Aeldari", icon: aeldari},
  {name: "Drukhari", icon: drukahri},
  {name: "Genestealer Cults", icon: genestealers},
  {name: "Leagues of Votann", icon: votann},
  {name: "Necrons", icon: necrons},
  {name: "Orks", icon: orks},
  {name: "T’au Empire", icon: tau},
  {name: "Tyranids", icon: nids},
]

export const armyNames = armies.map(a => a.name);