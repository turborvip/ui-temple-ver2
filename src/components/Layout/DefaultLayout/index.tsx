import Header from "./Header";
import Footer from "./Footer";
import React from 'react'

type MyComponentProps = React.PropsWithChildren<{}>;
function DefaultLayout({children}:MyComponentProps) {
  return (
    <div>
        <Header/>
        <div className="content">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default DefaultLayout