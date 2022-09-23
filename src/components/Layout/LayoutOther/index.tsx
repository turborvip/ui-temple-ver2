import React from 'react'
import Header from './Header'
import Footer from './Footer'

type MyComponentProps = React.PropsWithChildren<{}>;
function LayoutOther({children}:MyComponentProps) {
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

export default LayoutOther