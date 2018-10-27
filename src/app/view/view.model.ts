interface Params {
    menu: string;
    nav: string;
    subnav: string;
}

class Nav {
    path: string;
    title: string;
    constructor(input: Partial<APIView>) {
        this.path = input.path;
        this.title = input.title;
    }
}

export interface APIView {
    id?: string;
    title: string;
    path: string;
    children?: APIView[];
}

export class View {
    title: string;
    path: string[];
    nav?: Nav[];
    subnav?: Nav[];

    constructor(view: Partial<APIView>, params: Params) {
        this.deserialize(view, params);
    }

    private convertArray(array: Partial<APIView>[]): Nav[] {
        let newArray: Nav[] = [];
        if (array) {
            newArray = array.map(item => new Nav(item));
        }
        return newArray;
    }

    private deserialize(view: Partial<APIView>, params: Params) {
        const { menu, nav, subnav } = params;
        let selectedView = view;
        this.path = [];
        this.path.push(menu); // always start with first level (menu)

        if (view.children && view.children.length > 0) {
            this.nav = this.convertArray(view.children);

            // Set selected view if `nav` was specified, otherwise default to first nav available
            const i = nav ? view.children.findIndex(children => children.path === nav) : 0;
            selectedView = view.children[i];
            this.path.push(selectedView.path);


            if (selectedView.children && selectedView.children.length > 0) {
                this.subnav = this.convertArray(selectedView.children);

                // Set selected view if `subnav` was specified, otherwise default to first subnav avialable
                const j = subnav ? selectedView.children.findIndex(children => children.path === subnav) : 0;
                selectedView = selectedView.children[j];
                this.path.push(selectedView.path);
            }
        }

        this.title = selectedView.title;
        return this;
    }
}