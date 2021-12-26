import PostThumbnail from "../components/PostThumbnail"

export default function Home(){

    const postthumbnail = (index) => {
        return( 
             <PostThumbnail 
             value = {index}
         />
         )
     }
     return(
         <div className="container">
             <div className="row">
                 {postthumbnail(0)}
                 {postthumbnail(1)}
             </div>
             <div className="row">
                 {postthumbnail(2)}
                 {postthumbnail(3)}
             </div>
             <div className="row">
                 {postthumbnail(4)}
             </div>
         </div>
     );
}