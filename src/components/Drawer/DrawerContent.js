import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import allThemes from '../../themes';
import allLocales from '../../locales';
import {injectIntl} from 'react-intl';

const DrawerContent = (props) => {

  const {
    location,
    responsiveDrawer,
    setResponsive,
    theme,
    locale,
    updateTheme,
    updateLocale,
    intl
  }=props;

  const handleChange = (event, index) => {
    const {push, responsiveDrawer} = props;

    if(responsiveDrawer.open && index!==undefined){
      //setDrawerOpen(false);
    }

    if(index!==undefined && index!==Object(index)){
      push(index);
    }
  };

  const themeItems= allThemes.map((theme)=>{
    return {
      value:undefined,
      visible: true,
      primaryText: intl.formatMessage({id: theme.id}),
      onTouchTap: ()=>{updateTheme(theme.id)},
      //leftIcon: <FontIcon className="material-icons" >style</FontIcon>
    }
  });



  const localeItems=allLocales.map((localization)=>{

    return {
      value:undefined,
      visible: true,
      primaryText: intl.formatMessage({id: localization.locale}) ,
      onTouchTap: ()=>{updateLocale(localization.locale)},
      //leftIcon: <FontIcon className="material-icons" >style</FontIcon>
    }
  });

  const menuItems=[
    {
      value:'/drawer_controls',
      visible: true,
      primaryText: 'Drawer Controls',
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>
    },
    {
      value:'/test1',
      visible: true,
      primaryText: 'test',
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>
    },
    {
      value:'/test2',
      visible: true,
      primaryText: 'test2',
      leftIcon: <FontIcon className="material-icons" >transfer_within_a_station</FontIcon>
    },
    {
      divider:true,
    },
    {
      primaryText: intl.formatMessage({id: 'settings'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >settings</FontIcon>,
      nestedItems:[
        {
          primaryText: intl.formatMessage({id: 'theme'}),
          secondaryText: intl.formatMessage({id: theme}),
          primaryTogglesNestedList: true,
          leftIcon: <FontIcon className="material-icons" >style</FontIcon>,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({id: 'language'}),
          secondaryText: intl.formatMessage({id: locale}),
          primaryTogglesNestedList: true,
          leftIcon: <FontIcon className="material-icons" >language</FontIcon>,
          nestedItems: localeItems,
        },
        {
          primaryText: intl.formatMessage({id: 'responsive'}),
          leftIcon: <FontIcon className="material-icons" >chrome_reader_mode</FontIcon>,
          rightToggle: <Toggle
            toggled={responsiveDrawer.responsive}
            onToggle={
              () => {setResponsive(!responsiveDrawer.responsive)}
            }
          />,
        },
      ]
    },
  ];

  return (
    <div>
      <SelectableMenuList
        items={menuItems}
        onIndexChange={handleChange}
        index={location?location.pathname:'/'}
      />
    </div>
  );
}

export default injectIntl(muiThemeable()(DrawerContent));
