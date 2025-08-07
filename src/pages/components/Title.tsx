

function Header({title} : {title: string}) {
    return <div className="lg:items-center lg:content-center text-center">
            <h1 className="font-bold text-center font lg:text-2xl">{title}</h1>
        </div>;
}

export default Header