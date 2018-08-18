import { TypedEventEmitter } from '@viewjs/events';

// Cached regex for stripping a leading hash/slash and trailing space.
const routeStripper = /^[#\/]|\s+$/g,
    // Cached regex for stripping leading and trailing slashes.
    rootStripper = /^\/+|\/+$/g,
    // Cached regex for removing a trailing slash.
    trailingSlash = /\/$/,
    // Cached regex for stripping urls of hash and query.
    pathStripper = /[#].*$/;

export enum HistoryProvider {
    Fragment = 1, Push //, Both
}

export interface NavigateOptions {
    trigger?: boolean;
    replace?: boolean;
}


export class PathChangeEvent {
    kind: HistoryProvider = HistoryProvider.Push
    constructor(public old: string, public value: string) { }
}

const { Push, Fragment } = HistoryProvider;

export class HistoryAPI extends TypedEventEmitter {
    public history?: History
    private location?: Location;
    private _started: boolean = false

    fragment?: string
    path?: string;

    get started() {
        return this._started;
    }

    get atRoot() {
        return this.location!.pathname.replace(/[^\/]$/, '$&/') === this.root;
    }

    get root() {
        return this._root;
    }

    get kind() {
        return this._kind;
    }

    constructor(private _kind: HistoryProvider, private _root: string = "/") {
        super();

        if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
        }
        this.checkPushUrl = this.checkPushUrl.bind(this);
        this.checkUrlFragment = this.checkUrlFragment.bind(this);
    }
    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start() {
        if (this.started) throw new Error("Router.history has already been started");
        this._started = true;

        // Figure out the initial configuration.
        // Is pushState desired or should we use hashchange only?
        //this.root = this.options.root || '/';

        // Normalize root to always include a leading and trailing slash.
        this._root = ('/' + this.root + '/').replace(rootStripper, '/');

        // Depending on whether we're using pushState or hashes, determine how we
        // check the URL state.
        switch (this.kind) {
            case Push:
                window.addEventListener('popstate', this.checkPushUrl, false);
                break;
            case Fragment:
                window.addEventListener('hashchange', this.checkUrlFragment, false);
                break;
        }

        this.checkUrl(this.kind);
    }

    stop() {
        if (!this.started) return;

        switch (this.kind) {
            case Push:
                window.removeEventListener('popstate', this.checkPushUrl);
                break;
            case Fragment:
                window.removeEventListener('hashchange', this.checkUrlFragment);
                break;
        }

        this._started = false;

    }


    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate(part: string, options?: NavigateOptions): any {
        if (!this.started) return false;
        if (!options || options === true) options = { trigger: !!options };

        var url = this.root + (part = this.getFragment(part || ''));

        // Strip the hash for matching.
        part = part.replace(pathStripper, '');


        switch (this.kind) {
            case Fragment:
                if (this.fragment == part) return;
                break;
            case Push:
                if (this.path == part) return;
                break;
        }

        // Don't include a trailing slash on the root.
        if (part === '' && url !== '/') url = url.slice(0, -1);

        switch (this.kind) {
            case Fragment:
                this._updateHash(this.location!, part, options.replace || false);
                if (options.trigger) this.checkUrl(this.kind)
                else this.fragment = part;
                break;

            case Push:
                this.history![options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
                if (options.trigger) this.checkUrl(this.kind);
                else this.path = part;
                break;

            default:
                this.location!.assign(url);

        }

    }


    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash(window?: Window) {
        var match = (window! || this).location.href.match(/#(.*)$/);

        return match ? match[1] : '';
    }

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment(fragment: string | HistoryProvider.Fragment | HistoryProvider.Push, _: boolean = false) {
        if (typeof fragment === 'string') {
            return fragment.replace(routeStripper, '');
        }

        switch (fragment) {
            case Fragment:
                return this.getHash();
            case Push: {
                let fragment = decodeURI(this.location!.pathname + this.location!.search);
                var root = this.root.replace(trailingSlash, '');
                if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
                return fragment;
            }
            default:
                throw new TypeError("fragment should a string or number");
        }
    }


    private checkUrlFragment() {
        this.checkUrl(Fragment)
    }

    private checkPushUrl() {
        this.checkUrl(Push);
    }

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`.
    protected checkUrl(part: HistoryProvider) {

        if (part == Fragment) {
            const current = this.getFragment(Fragment);

            if (current !== this.fragment /*&& (current == "" && this.fragment != undefined)*/) {
                this.trigger(new PathChangeEvent(this.fragment!, current))
            }
            this.fragment = current;
        } else if (part == Push) {
            const current = this.getFragment(Push);
            if (current !== this.path) {
                this.trigger(new PathChangeEvent(this.path!, current));
            }
            this.path = current;
        }

    }

    /**
     * Update the hash location, either replacing the current entry, or adding
     * a new one to the browser history.
     * 
     * @param {Location} location 
     * @param {string} fragment 
     * @param {boolean} replace 
     * @memberof HistoryAPI
     */
    private _updateHash(location: Location, fragment: string, replace: boolean) {
        if (replace) {
            var href = location.href.replace(/(javascript:|#).*$/, '');
            location.replace(href + '#' + fragment);
        } else {
            // Some browsers require that `hash` contains a leading #.
            location.hash = '#' + fragment;
        }
    }

    destroy() {
        super.destroy();
        this.stop();
        return this;
    }
} 