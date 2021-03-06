import React from 'react';
import { css, Global } from '@emotion/core';
import theme from '../../config/theme';
import Toolbar from './toolbar'
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './Backdrop/Backdrop'
import Footer from './footer'
import './layout.css'
import '../../config/base/snipcart.min.css'
import { ThemeProvider } from 'emotion-theming';
import PageTransition from 'gatsby-plugin-page-transitions';
import SEO from '../components/seo'






 class Layout extends React.Component {
      
      componentDidMount() {
          //index page is currently only page which has non-top white
          //if more added, create getScrollTarget fuction 
          if(this.props.navtheme === "light"){
            window.addEventListener('scroll', this.handleScroll);
          }

      };
      
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      };

      state = {
        sideDrawerOpen: false, 
        scroll: false,
        tags: "",
    };
      
      handleScroll = (event) => {
        const scrollTarget = document.getElementById('hero-image').offsetHeight-60;
        if(window.pageYOffset > scrollTarget){
            this.setState({
                scroll: true
            })
        } else {
            this.setState({
                scroll: false
            })
        }
        
        
        
      };

    
    
    drawerToggleClickHandler = () => {
     this.setState((prevState)=> {
         return{sideDrawerOpen: !prevState.sideDrawerOpen};
     });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };

    

    render() {
      const { children } = this.props;
      let scroll = this.state.scroll;
      let backdrop;

      if(this.state.sideDrawerOpen){
          backdrop = <Backdrop click={this.backdropClickHandler}/>;
      }

     
      return (
        <>
        
        <SEO/>
        <ThemeProvider theme={theme}>
        <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          html {
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            box-sizing: border-box;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          a {
            color: ${theme.colors.link};
            transition: color 0.5s;
            text-decoration: none;
          }
          a:hover {
            text-decoration: none;
            color: ${theme.colors.linkHover};
          }
          h1 {
            margin: 4rem 0;
          }

        `}
      />
        



        
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} open={this.state.sideDrawerOpen} navtheme={this.props.navtheme} scroll={this.state.scroll} />
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
        <PageTransition
            defaultStyle={{
            transition: `opacity .5s ease-in-out`,
            opacity: `100%`,
            top: '0%',
            width: '100%',
            position: 'absolute',
            }}
            transitionStyles={{
                entering: {opacity: 1},
                entered:  {opacity: 1},
                exiting:  {opacity: 0},
                exited:  {opacity: 0},
            }}
            transitionTime={500}
        >
          <div id="wrapper" >
            {children}
          </div>
        <Footer/>
        </PageTransition>
        </ThemeProvider>
          </>
      );
    }
  }
  export default Layout;














    



