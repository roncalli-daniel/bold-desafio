/**
Home Controller
**/
Home = {
    settings: {
        token: null,
        hashtag: null,
        query: '',
        tweets_take: 3,
        tweets_count: 0,
        tweets_skip: 0,
        medias_limit: 30,
        url_api: (App.settings.production ? 'http://api.bold.s10.cc/' : 'http://api.bold.dev/')
    },

    funcs: {
        UrlService: function(ep) {
            return Home.settings.url_api + ep;
        },

        RenderHashtag: function(hashtag) {
            jQuery('#hashtag').html('#' + hashtag);
        },

        RenderTweets: function(tweets, clear) {
            if(clear) {
                jQuery('#tweets').html('');
            }

            $(tweets).each(function(index, tweet) {
                Home.funcs.AppendTweet(tweet);
            });
        },

        AppendTweet: function(tweet) {
            tweet.media = function() {
                if(tweet.media_url) {
                    return '<img src="' + tweet.media_url + '" class="media-tweet"/>';
                }
            }

            jQuery('#tweets').mustache('tweet', tweet);
        },

        ScrollTop: function() {
            jQuery('html, body').animate( { scrollTop: 0 }, 'slow');
        },

        RenderCarousel: function(tweets) {
            console.log(tweets);
            var c = jQuery('#tweets-caurosel');

            c.html('');

            if(c.data('owlCarousel') !== undefined)
                c.data('owlCarousel').destroy();

            c.mustache('tweet-item-caurosel', tweets );

            c.owlCarousel( {
                loop: false,
                dots: false,
                nav: true,
                margin: 10,
                responsiveClass: true,
                items: 3,
                responsive: true
            });
            console.log(c.data('owlCarousel'));
        }
    },

    triggers: {
        LoadTweets: function() {
            jQuery('.btn-load-tweets').click(function() {
                Home.actions.Tweets(Home.settings.tweets_take, Home.settings.tweets_skip, Home.settings.query, false);
            });
        },

        SearchTweets: function() {
            jQuery('#frm_search').submit(function(event) {
                Home.settings.tweets_take = 3;
                Home.settings.tweets_skip = 0;
                Home.settings.query = jQuery('#query').val();

                Home.actions.Tweets(Home.settings.tweets_take, Home.settings.tweets_skip, Home.settings.query, true);
                Home.actions.Medias(Home.settings.query, Home.settings.medias_limit);

                event.preventDefault();
            });
        },

        Sync: function() {
            jQuery('.btn-refresh').click(function() {
                Home.actions.Sync();
            });
        }
    },

    actions: {
        Token: function() {
            var params = {
                url: Home.funcs.UrlService('tokens'),
                type: "GET",
                callback_success: function (r) {
                    Home.settings.token = r.data.token;
                    Home.settings.hashtag = r.data.hashtag;
                    Home.funcs.RenderHashtag(r.data.hashtag);
                }
            };

            App.request(params);
        },

        Tweets: function(take, skip, query, clear) {
            var params = {
                url: Home.funcs.UrlService('tweets'),
                type: "GET",
                data: {
                    take: take,
                    skip: skip,
                    query: query
                },
                callback_success: function (r) {
                    Home.settings.tweets_count = r.data.count;
                    Home.settings.tweets_skip += Home.settings.tweets_take;
                    Home.funcs.RenderTweets(r.data.tweets, clear);

                    if(r.data.count == 0)
                        toastr.warning('Nenhum tweet encontrado para listar...');
                }
            };

            App.request(params);
        },

        Medias: function(query, limit) {
            var params = {
                url: Home.funcs.UrlService('tweets/medias'),
                type: "GET",
                data: {
                    limit: limit,
                    query: query
                },
                callback_success: function (r) {
                    if(r.data.count == 0)
                        toastr.warning('Nenhum tweet com imagem foi encontrado para montar a galeria...');

                     Home.funcs.RenderCarousel(r.data.tweets);
                }
            };

            App.request(params);
        },

        Sync: function() {
            var params = {
                url: Home.funcs.UrlService('sync'),
                type: "PUT",
                callback_success: function (r) {
                    Home.load.reset();
                    if(r.data == 0) {
                        toastr.warning('Todos os últimos tweets já foram sincronizados.');
                    }
                    else if(r.data == 1) {
                        toastr.success('1 tweet foi sincronizado.');
                    }
                    else {
                        toastr.success(r.data + ' tweets foram sincronizados.');
                    }
                }
            };

            App.request(params);
        },

    },

    load: {
        mustache: function() {
            jQuery.Mustache.load('./scripts/templates/partials/tweet.html');
            jQuery.Mustache.load('./scripts/templates/partials/tweet-item-caurosel.html');
        },

        tweets: function() {
            Home.actions.Tweets(Home.settings.tweets_take, Home.settings.tweets_skip, Home.settings.query, true);
        },

        caurosel: function() {
            Home.actions.Medias(Home.settings.query, Home.settings.medias_limit);
        },

        reset: function() {
            Home.settings.tweets_take = 3;
            Home.settings.tweets_skip = 0;

            Home.load.tweets();
            Home.load.caurosel();
            Home.funcs.ScrollTop();
        }
    },

    start: {
        config: function() {
            Home.actions.Token();
        },

        triggers: function() {
            Home.triggers.LoadTweets();
            Home.triggers.SearchTweets();
            Home.triggers.Sync();
        }
    },

    init: {
        index: function () {
            Home.start.config();
            Home.start.triggers();
            Home.load.mustache();
            Home.actions.Sync();
        }
    }
}