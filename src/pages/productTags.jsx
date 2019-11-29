import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import TagsBlock from '../components/ProductTagsBlock';
import { Link, graphql } from 'gatsby';
import ProductListing from "../components/product-link";
// import DropdownBtn from "../components/dropdownBtn";
import DropdownBtn from "../components/dropdownButton";

import SEO from "../components/seo"
import "../pages/products.css"

// const Tags = ({ pageContext, data }) => {
class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
      state = {
        sortBtn: false,  
        sortText:"price low-high",
        sortLinkPre: "/products/",
        sortOption: "frontmatter___price",
        sortOrder: "ASC",
        ColorOption: "all",
        priceRange: "all",
    };
      
       // sort (state) set to button value when clicked
    sortTextClickHandler = (option) => {
        console.log("option:" + option);
        this.setState(() => {
            return {sort: option}
        });
       };
      
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        //set state based on page context, this is done so state is not reset to defualt "price low-high" on page reload
        if (this.props.pageContext.order === "DESC" && this.props.pageContext.sortOption === "frontmatter___price"){this.sortTextClickHandler("price high-low")}
         else if (this.props.pageContext.order === "ASC" && this.props.pageContext.sortOption === "frontmatter___price"){this.sortTextClickHandler("price low-high")}
         else if (this.props.pageContext.order === "DESC" && this.props.pageContext.sortOption === "frontmatter___date"){this.sortTextClickHandler("old gold")}
         else {this.sortTextClickHandler("new releases")};
         //same for ColorOption
        if (this.state.ColorOption !== this.props.pageContext.colorOption){this.setState({ColorOption: this.props.pageContext.colorOption})};
        // and priceRange 
        if (this.state.PriceRange !== this.props.pageContext.priceRange){this.setState({PriceRange: this.props.pageContext.priceRange})};
         
        //  console.log("Color Option:" + this.dropdownRef1.current.state.ColorOption)


         //creating var sortLinkPre so sortBtns redirect to the proper url whether there is a tag selected or not. 
        // *neccacery since I now use productTags.jsx for both pages vs haveing productTag && productTags as templates;
        const tagName = this.props.pageContext.tagName;
        console.log("tagname:" + tagName);
        if (tagName !== undefined && this.state.sortLinkPre === "/products/"){
            this.setState(() => {
                let link = "/products/" + tagName;
                console.log("tagnameinyeah" + tagName)
                return {sortLinkPre : link }
            }); 
        } else if (this.state.sortLinkPre !== "/products/" && tagName === undefined){
             this.setState(() => { return {sortLinkPre: "/products/"}})
            }    
         
      };
      
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        
      };

      componentDidUpdate(){
        console.log("ColorOption:" + this.state.ColorOption)
        console.log("PriceOption:" + this.state.PriceOption)
        


        
      }

     
    // sort button is set to true when clicked, displaying sort options
    sortBtnToggleClickHandler = () => {
        this.setState((prevState)=> {
            return{sortBtn: !prevState.sortBtn};
        });

       };
   
       //set the sortBtn wrapper ref
       setWrapperRef(node) {
        this.wrapperRef = node;
      }
      // close sort bar
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState(() => {
                return {sortBtn: false}
            });
        }
      }

      setDropdownState = (option, mainText) => {
        this.setState({[mainText + "Option"]: option})
        console.log([mainText + "Option:"] + this.state.sortColor)
      }






      



    render(){
        if (!this.props) { console.log("no data")};
        console.log(this.props);
        const { tags } = this.props.pageContext;
        const tagName = this.props.pageContext.tagName;
        //  console.log(products);
        const postEdges = this.props.data.allMarkdownRemark.edges;
        // console.log(postEdges.length)
        // console.log("Sort open: " + this.state.sortBtn)
        // console.log("Sort by: " + this.state.sort)
        // console.log(this.props.pageContext)
        // console.log(this.props.pageContext.order)
        // console.log(this.props.pageContext.colors)
        console.log(postEdges)
        
        

        
       
        console.log("sortLinkPre:" + this.state.sortLinkPre);
        let sortLinkPre = this.state.sortLinkPre;
        
       

        //getting colors for dropdownButton
        var colorOptions = this.props.pageContext.colors;
        var selectedColor = this.state.ColorOption
        if (colorOptions[0] !== "all")colorOptions.unshift("all")

        var pageProductColors = [];
        postEdges.forEach(({node}) => {
            if (node.frontmatter.color){
                node.frontmatter.color.forEach(color => {
                    if (!pageProductColors.includes(color)){
                        pageProductColors.push(color);
                    }
                    
                })
            }
        })
        if (!tagName){pageProductColors = colorOptions}
        console.log(pageProductColors);
        
             

        

        
        
        

return (
    <Layout>


        <div className="top-margin">
            <SEO />
            <div className="sort-bar">
                Shop/{tagName}
                <a>{postEdges.length} items found</a>
                <button onClick={() => this.sortBtnToggleClickHandler()} className={this.state.sortBtn ? 'sort-button open' : "sort-button"} ref={this.setWrapperRef}>
                    sort: {this.state.sort} 
                    <div>
                        <Link className="sortLink" to={sortLinkPre + "/frontmatter___price/ASC/all"} onClick={() => this.sortTextClickHandler("price low-high")}>price low-high</Link>
                        <Link className="sortLink" to={sortLinkPre + "/frontmatter___price/DESC/all"} onClick={() => this.sortTextClickHandler("price high-low")}>price high-low</Link>
                        <Link className="sortLink" to={sortLinkPre + "/frontmatter___date/ASC/all"} onClick={() => this.sortTextClickHandler("new releases")}>new releases</Link>
                        <Link className="sortLink" to={sortLinkPre + "/frontmatter___date/DESC/all"} onClick={() => this.sortTextClickHandler("old gold")}> old gold</Link>
                    </div>
                    </button></div>
            <div className="content">
            {/* "/products/{{this.props.tagName}}/frontmatter___price/ASC" */}
            
                <div className="filter-bar">
                <h2>Clothing:</h2>
                <div className="catalog-menu">
                    
                    <p>Catagory</p>
                    <TagsBlock list={tags} />
                    <Link to="/products/frontmatter___date/ASC/all">Shop All</Link>
                    <p>Refine</p><br/>
                    {/* <DropdownBtn ref={this.dropdownRef1} mainText="Color" options={this.props.pageContext.colors || ['']} />
                    <DropdownBtn ref={this.dropdownRef2} mainText="Price" options={[' 0-50',' 50-100', " 100-200"] || ['']}/> */}

                    <DropdownBtn onChange={this.setDropdownState} options={pageProductColors || ['']} mainText="Color" sortlinkpre={sortLinkPre} priceRange={this.props.pageContext.priceRange}/>
                    <DropdownBtn onChange={this.setDropdownState} options={['0-50','50-100', '100-200'] || ['']} mainText="Price" sortlinkpre={sortLinkPre} colorOption={this.props.pageContext.colorOption}/>
                    
                    
                    
                    
                    

                </div>
                </div>
                <ProductListing postEdges={postEdges} wrap={"wrapper-left"}/>
            </div>
          </div>

    </Layout>
  );
    }
};


export default Tags;

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tags: PropTypes.array,
  }),
};

export const pageQuery = graphql`
    query(
        $tagName: String, 
        $order: [SortOrderEnum], 
        $sortOption: [MarkdownRemarkFieldsEnum],
        $colorOption: String,
        $priceUpper: Int,
        $priceLower: Int,
        )  {
        allMarkdownRemark(sort: {
             order: $order, fields: $sortOption }
             filter: {fields: {collection: {eq: "products"}},frontmatter: {tags: {eq: $tagName}, color: {eq : $colorOption}, price: {gte: $priceLower , lte: $priceUpper} }  }
             ) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                path
                name
                price
                weight
                templateKey
                tags
                color
                image {
                    childImageSharp {
                        fluid(maxWidth: 980) {
                            ...GatsbyImageSharpFluid
                            src
                        }
                    }
                }
              }
    
            }
          }
        }
      }
    `