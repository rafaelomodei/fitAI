import { GIF } from '../../assets/gif';
import { ICON_SVG } from '../../assets/svg';
import { ITraining } from './interface';

export const TRAININGS: ITraining[] = [
  {
    id: 1,
    name: 'Bicips',
    description:
      'Adicionar rosca bíceps à sua rotina de exercícios ajuda a esculpir a parte superior do corpo, molda e tonifica os ombros e os bíceps e também melhora a força dos braços. Ao fazer rosca bíceps, mantenha os joelhos e as articulações dos cotovelos soltos, envolva os músculos centrais e mantenha as palmas das mãos voltadas para a frente. Expire ao levantar os halteres e mantenha as costas retas, os ombros para trás e a cabeça erguida.',
    icon: ICON_SVG.Bicep,
    gif: GIF.BicepsCurl,
    repeat: 0,
    pose: {
      angle: 0.75,
      landmark: {
        a: 12,
        b: 14,
        c: 16,
      },
    },
  },
  {
    id: 2,
    name: 'Costas',
    description:
      'Adicionar extensões para as costas à sua rotina de exercícios ajuda a fortalecer os músculos das costas e a melhorar a postura e o equilíbrio. Para ter um núcleo forte, é importante trabalhar não apenas os abdominais e oblíquos, mas também os músculos das costas.. Use as mãos para apoiar a cabeça e remover toda a pressão do pescoço. Envolva os músculos centrais, mantenha o queixo erguido e expire enquanto levanta o tronco. Mantenha o movimento suave e dentro de uma amplitude de movimento confortável.',
    icon: ICON_SVG.BodyBack,
    gif: GIF.BackExtensions,
    repeat: 0,
    pose: {
      angle: 0.7,
      landmark: {
        a: 1,
        b: 2,
        c: 3,
      },
    },
  },
  {
    id: 3,
    name: 'Glúteos',
    description:
      'O retrocesso da banda atinge os glúteos e ajuda a melhorar a força e o tônus ​​muscular. Este exercício também aumenta a estabilidade e o equilíbrio do núcleo e ajuda a esculpir os quadris, pernas e coxas. Mantenha as costas retas, os dedos dos pés apontados, envolva o núcleo e mantenha o movimento fluido e contínuo. Expire enquanto joga as pernas para trás e aperta os glúteos.',

    icon: ICON_SVG.BodyButt,
    gif: GIF.BandKickback,
    repeat: 0,
    pose: {
      angle: 0.7,
      landmark: {
        a: 29,
        b: 24,
        c: 32,
      },
    },
  },
];
