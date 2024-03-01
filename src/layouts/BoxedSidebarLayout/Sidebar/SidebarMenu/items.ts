import type { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import BadgeIcon from '@mui/icons-material/Badge';
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';
import TheatersTwoToneIcon from '@mui/icons-material/TheatersTwoTone';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export interface MenuItem {
  link?: string;
  icon?: OverridableComponent<SvgIconTypeMap> & {
    muiName: string;
  };
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Management',
    items: [
      {
        name: 'Eventos',
        icon: LiveTvTwoToneIcon,
        link: '/dashboard/management/events'
      },
      {
        name: 'Usuarios',
        icon: AssignmentIndTwoToneIcon,
        link: '/dashboard/management/users'
      },
      {
        name: 'Roles',
        icon: BadgeIcon,
        link: '/dashboard/management/roles'
      },
      {
        name: 'Notificaciones',
        icon: WallpaperIcon,
        link: '/dashboard/management/notifications'
      },

      {
        name: 'Novedades',
        icon: TheatersTwoToneIcon,
        link: '/dashboard/management/news'
      },

      {
        name: 'Estadísticas',
        icon: CategoryIcon,
        link: '/dashboard/management/statistics'
      },
      {
        name: 'Tags',
        icon: AccountBoxIcon,
        link: '/dashboard/management/tags'
      },
      {
        name: 'Cerrar sesión',
        icon: ErrorTwoToneIcon,
        link: '/status/coming-soon'
      }
    ]
  },
  /* {
    heading: 'Extra Pages',
    items: [
      {
        name: 'Status',
        icon: ErrorTwoToneIcon,
        link: '/status',
        items: [
          {
            name: 'Error 404',
            link: '/status/404'
          },
          {
            name: 'Error 500',
            link: '/status/500'
          },
          {
            name: 'Maintenance',
            link: '/status/maintenance'
          },
          {
            name: 'Coming Soon',
            link: '/status/coming-soon'
          }
        ]
      }
    ]
  } */
];

export default menuItems;
