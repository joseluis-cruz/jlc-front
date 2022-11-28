export {CHomeContainer}

interface HomeContainerProps {
    readonly onSelectAction?: (action: string) => void;
}

function CHomeContainer (props: HomeContainerProps)
{
    return (
        <div id="HomeContainer" className="flxrow flxgr1 container-main">
            <div className="flxcol flxspa bkgtrl pd1e container-left">
                &nbsp;
            </div>
            <div className="flxgr1">
                &nbsp;
            </div>    
        </div>
        );
}