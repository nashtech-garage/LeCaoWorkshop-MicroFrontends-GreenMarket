import BlogDetailInfo from "./components/blog-detail-info/BlogDetailInfo.component";
import {BrowserRouter} from "react-router-dom"
export default function Root() {
  return (
    <BrowserRouter>
      <BlogDetailInfo />
    </BrowserRouter>
  );
}
