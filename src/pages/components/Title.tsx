

function Header({title} : {title: string}) {
    return <div className="items-center content-center text-center">
            <h1 className="font-bold text-center lg:text-[2.5rem]">{title}</h1>
        </div>;
}

export default Header