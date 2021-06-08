function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
var Namespace = function() {}, PendoHandler;
Namespace.definitions = {};
Namespace.queue = [];
Namespace.compiled = !1;
Namespace.globalvar = null;
Namespace.global = function() {
    return Namespace.globalvar || (Namespace.globalvar = {},
    window["global" + Math.floor(Math.random() * 1e8 + 1)] = Namespace.globalvar),
    Namespace.globalvar
}
;
Namespace.using = function(n, t) {
    for (var f, e = n.split("."), i = window, r = "", u = 0, o = e.length; u < o; u++)
        r = e[u],
        i[r] = i[r] || {},
        i = i[r];
    return f = i,
    typeof t == "function" ? t(f) : !1,
    f
}
;
Namespace.classdef = function(n, t) {
    Namespace.compiled ? Namespace.classCompile(n, t) : Namespace.queue.push({
        name: n,
        definition: t
    })
}
;
Namespace.compile = function(n) {
    for (var i, t = 0; t < Namespace.queue.length; t++)
        i = Namespace.queue[t],
        Namespace.classCompile(i.name, i.definition);
    Namespace.compiled = !0;
    typeof n == "function" ? n() : !1
}
;
Namespace.classCompile = function(n, t) {
    for (var f = n.split("."), i = window, r = "", u = 0; u < f.length; u++)
        r = f[u],
        u < f.length - 1 && (i[r] = i[r] || {},
        i = i[r]);
    typeof t == "function" && t(function(t, u, f) {
        var e, o;
        if (e = typeof t == "object" ? t : {
            init: t,
            proto: u,
            stat: f
        },
        typeof e.init == "function") {
            if (Namespace.definitions[n] = e,
            o = e.init,
            typeof e.proto == "object")
                for (x in e.proto)
                    e.proto.hasOwnProperty(x) && (o.prototype[x] = e.proto[x]);
            if (typeof e.stat == "object")
                for (x in e.stat)
                    e.stat.hasOwnProperty(x) && (o[x] = e.stat[x]);
            i[r] = i[r] || o
        }
    }, Namespace.properties)
}
;
Namespace.extend = function() {}
;
Namespace.properties = function(n, t) {
    return properties = $.extend({}, n, t)
}
;
Namespace.safecall = function(n) {
    return typeof n == "function" ? n : function() {}
}
;
Namespace.forward = function(n, t) {
    typeof t == "function" && t.apply(n, Array.prototype.slice.call(arguments))
}
;
Namespace.classdef("edgenuity.utility.Sort", function(n) {
    n(function() {}, {}, {
        sortBy: function(n, t, i) {
            return i ? function(r, u) {
                var f = i(r[n])
                  , e = i(u[n]);
                return (f < e ? -1 : f > e ? 1 : 0) * [1, -1][+!!t]
            }
            : function(i, r) {
                var u = i[n]
                  , f = r[n];
                return (u < f ? -1 : u > f ? 1 : 0) * [1, -1][+!!t]
            }
        }
    })
});
Namespace.classdef("edgenuity.utility.AudioPlayer", function(n) {
    n(function() {
        var n = this, t;
        audiojs.events.ready(function() {
            var t = document.createElement("audio")
              , i = document.createElement("div");
            i.appendChild(t);
            document.body.appendChild(i);
            n.audio = audiojs.create(t, {
                markup: !1,
                css: !1
            })
        });
        n.play = function() {
            n.audio.play()
        }
        ;
        n.stop = function() {
            n.audio.pause();
            n.audio.skipTo(0)
        }
        ;
        n.pause = function() {
            n.audio.pause()
        }
        ;
        n.load = function(t) {
            n.audio.load(t)
        }
        ;
        n.playing = function() {
            return n.audio.playing
        }
        ;
        t = function() {}
        ;
        n.activate = function(i, r) {
            if (n.audio.mp3 != i && (n.playing() && (n.stop(),
            n.audio.settings.trackEnded()),
            n.load(i)),
            n.audio.settings.trackEnded = r ? r : t,
            n.playing())
                n.pause();
            else {
                var u = function() {
                    try {
                        n.play()
                    } catch (t) {
                        setTimeout(u, 100)
                    }
                };
                u()
            }
        }
    }, {})
});
Namespace.classdef("edgenuity.utility.TreeNode", function(n) {
    n(function(n) {
        var t = this;
        this.Name = ko.observable();
        this.Items = ko.observableArray();
        this.Data = null;
        this.ItemsData = null;
        this.expanded = ko.observable(!1);
        this.expanded.subscribe(function() {
            if (t.Items().length == 0 && t.ItemsData && t.ItemsData.length > 0)
                for (var n = 0; n < t.ItemsData.length; n++)
                    t.Items.push(new edgenuity.utility.TreeNode(t.ItemsData[n]))
        });
        n && this.populate(n);
        this.hasItems = ko.computed(function() {
            var n = !1;
            return (t.Items().length > 0 || t.ItemsData && t.ItemsData.length > 0) && (n = !0),
            n
        })
    }, {
        populate: function(n) {
            this.Name(n.Name);
            this.ItemsData = n.Items;
            this.Data = n
        },
        expand: function() {
            this.hasItems() ? this.expanded() ? this.expanded(!1) : this.expanded(!0) : (this.expanded(!1),
            this.select())
        },
        select: function() {
            this.Data.select && this.Data.select()
        }
    })
});
Namespace.classdef("edgenuity.utility.TreeWidget", function(n) {
    n(function(n) {
        var t = this;
        this.Items = ko.observableArray();
        this.populate = function(n) {
            for (var i = 0; i < n.length; i++)
                t.Items.push(new edgenuity.utility.TreeNode(n[i]))
        }
        ;
        n && this.populate(n)
    }, {})
});
Namespace.classdef("edgenuity.service.Service", function(n) {
    n(function(n) {
        this.routes = {};
        this.basepath = n;
        this.xdm = {
            active: !1,
            path: "",
            socket: null,
            callback: null
        }
    }, {
        init: function() {
            this.xdm.active && (this.xdm.socket = new easyXDM.Socket({
                remote: this.xdm.path,
                onMessage: function(n, t) {
                    typeof this.xdm.callback == "function" && this.xdm.callback(n, t)
                },
                onReady: function() {
                    socket.postMessage("Yay, it works!")
                }
            }))
        },
        Get: function(n, t, i) {
            var r = {
                success: function() {},
                error: function() {},
                rawResponse: !1,
                async: !0
            }, u;
            $.extend(r, i);
            u = this;
            $.ajax({
                type: "GET",
                async: r.async,
                url: this.processRoute(n),
                dataType: this.processDataType(r.rawResponse),
                data: t,
                success: function(n, t, i) {
                    u.processSuccess(n, t, i, r.success, r.error, r.rawResponse)
                },
                error: function(n, t, i) {
                    u.processError(n, t, i, r.success, r.error, r.rawResponse)
                }
            })
        },
        Head: function(n, t, i) {
            var r = {
                success: function() {},
                error: function() {},
                rawResponse: !1
            }, u;
            $.extend(r, i);
            u = this;
            $.ajax({
                type: "HEAD",
                url: this.processRoute(n),
                dataType: this.processDataType(r.rawResponse),
                data: t,
                success: function(n, t, i) {
                    u.processSuccess(n, t, i, r.success, r.error, r.rawResponse)
                },
                error: function(n, t, i) {
                    u.processError(n, t, i, r.success, r.error, r.rawResponse)
                }
            })
        },
        Delete: function(n, t, i) {
            var r = {
                success: function() {},
                error: function() {},
                rawResponse: !1
            }, u;
            $.extend(r, i);
            u = this;
            $.ajax({
                type: "DELETE",
                url: this.processRoute(n),
                dataType: this.processDataType(r.rawResponse),
                data: t,
                success: function(n, t, i) {
                    u.processSuccess(n, t, i, r.success, r.error, r.rawResponse)
                },
                error: function(n, t, i) {
                    u.processError(n, t, i, r.success, r.error, r.rawResponse)
                }
            })
        },
        Post: function(n, t, i) {
            var f = this, r = {
                success: function() {},
                error: function() {},
                isJSON: !1,
                rawResponse: !1
            }, u;
            $.extend(r, i);
            r.isJSON && (r.contentType = "application/json; charset=utf-8");
            u = {
                type: "POST",
                url: this.processRoute(n),
                dataType: this.processDataType(r.rawResponse),
                data: t,
                success: function(n, t, i) {
                    f.processSuccess(n, t, i, r.success, r.error, r.rawResponse)
                },
                error: function(n, t, i) {
                    f.processError(n, t, i, r.success, r.error, r.rawResponse)
                }
            };
            r.dataType && (u.dataType = r.dataType);
            r.contentType && (u.contentType = r.contentType);
            r.hasOwnProperty("async") && (u.async = r.async);
            $.ajax(u)
        },
        Put: function(n, t, i) {
            var r = {
                success: function() {},
                error: function() {},
                isJSON: !1,
                rawResponse: !1
            }, u;
            $.extend(r, i);
            u = this;
            r.isJSON ? $.ajax({
                type: "PUT",
                url: this.processRoute(n),
                dataType: this.processDataType(r.rawResponse),
                contentType: "application/json; charset=utf-8",
                data: t,
                success: function(n, t, i) {
                    u.processSuccess(n, t, i, r.success, r.error, r.rawResponse)
                },
                error: function(n, t, i) {
                    u.processError(n, t, i, r.success, r.error, r.rawResponse)
                }
            }) : $.ajax({
                type: "PUT",
                url: this.processRoute(n),
                dataType: this.processDataType(r.rawResponse),
                data: t,
                success: function(n, t, i) {
                    u.processSuccess(n, t, i, r.success, r.error, r.rawResponse)
                },
                error: function(n, t, i) {
                    u.processError(n, t, i, r.success, r.error, r.rawResponse)
                }
            })
        },
        processSuccess: function(n, t, i, r) {
            r(n, t, i)
        },
        processError: function(jqXHR, textStatus, errorThrown, success, error) {
            try {
                var exception = eval(jqXHR.responseText)
            } catch (e) {}
            error(jqXHR, textStatus, errorThrown)
        },
        processRoute: function(n) {
            var t = "", i;
            return n && (typeof n == "string" ? t = n : (typeof n.route == "string" && (t = n.route),
            typeof n.request == "object" && (i = $.params(n.request),
            i && (t += "?" + i)))),
            this.basepath + t
        },
        processDataType: function(n) {
            return n ? "text" : "json"
        }
    })
});
Namespace.classdef("edgenuity.model.glossary.WordModel", function(n) {
    n(function() {
        this.Key = ko.observable();
        this.Definition = ko.observable();
        this.Word = ko.observable();
        this.AudioFileLocation = ko.observable();
        this.TTStext = ko.observable();
        this.Playing = ko.observable(!1)
    }, {
        populate: function(n) {
            this.Key(n.Key);
            this.Definition(n.Definition);
            this.Word(n.Word);
            this.AudioFileLocation(n.AudioFileLocation);
            this.TTStext(n.TTStext)
        },
        clear: function() {
            this.Key(null);
            this.Definition(null);
            this.Word(null);
            this.AudioFileLocation(null);
            this.TTStext(null)
        },
        get: function(n, t) {
            var i = this;
            n.Get("vocabulary/get", {
                _id: t
            }, {
                success: function(n, t, r) {
                    i.populate(n);
                    typeof success == "function" ? success(n, t, r) : !1
                },
                error: function(n, t, i) {
                    typeof error == "function" ? error(n, t, i) : !1
                }
            })
        },
        play: function() {
            alert("in here")
        }
    })
});
Namespace.classdef("edgenuity.model.glossary.GlossaryModel", function(n) {
    var i = edgenuity.model.glossary.WordModel, t;
    n(function(n) {
        this.WordList = ko.observableArray();
        this.searchTerm = ko.observable();
        this.displaySearch = ko.observable(!1);
        this.searchURL = "";
        this.proxyService = n
    }, {
        populate: function(n) {
            var t, u, r;
            if (Actions.Log(),
            this.WordList.removeAll(),
            n && n.WordList)
                for (t = 0; t < n.WordList.length; t++)
                    u = n.WordList[t],
                    r = new i,
                    r.populate(u),
                    r.Word() && this.WordList.push(r)
        },
        clear: function() {
            Actions.Log();
            this.WordList().removeAll()
        },
        addWord: function(n) {
            Actions.Log();
            this.WordList.push(n)
        },
        get: function(n, t, i, r) {
            Actions.Log();
            var u = this;
            n.Get("", {
                id: t
            }, {
                success: function(n) {
                    u.populate(n);
                    Namespace.forward(u, i)
                },
                error: function() {
                    Namespace.forward(u, r)
                }
            })
        },
        search: function() {
            Actions.Log();
            var n = this, r;
            r = $.browser.msie ? {
                url: n.proxyService.basepath,
                data: JSON.stringify({
                    url: n.searchURL,
                    data: {
                        text: n.searchTerm()
                    },
                    method: "get"
                }),
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            } : {
                url: n.searchURL + "&text=" + n.searchTerm(),
                type: "GET"
            };
            r.success = function(r) {
                var u, f, e;
                if ($data = $(r.substr(7)),
                !t || t === []) {
                    u = [];
                    for (f in n.WordList())
                        u[f] = n.WordList()[f];
                    t = u
                }
                n.WordList.removeAll();
                e = [];
                $data.find("span").not("[id^=def]").not("[placeholder^=def]").each(function() {
                    var t = new i;
                    t.populate({
                        Word: n.searchTerm(),
                        Definition: this.innerHTML
                    });
                    e.push(t)
                });
                n.WordList(e);
                n.displaySearch(!0)
            }
            ;
            $.ajax(r)
        },
        closeSearch: function() {
            Actions.Log();
            this.WordList(t ? t : []);
            t = null;
            this.displaySearch(!1);
            this.searchTerm("")
        },
        play: function(n) {
            Actions.Log();
            n.Playing() || (n.AudioFileLocation() ? Namespace.global().playerView.audioPlayer.activate(n.AudioFileLocation()) : $rw_speakText ? $rw_speakText(n.Word()) : Namespace.global().playerView.toolbar().readAloud.playString(n.Word()))
        }
    })
});
Namespace.classdef("edgenuity.model.glossary.GlossaryViewModel", function(n) {
    var t = edgenuity.model.glossary.GlossaryModel
      , i = edgenuity.model.glossary.WordModel;
    n(function(n, i) {
        var r = this;
        this.glossaryService = ko.observable();
        this.glossaryService.subscribe(function(n) {
            n || r.show(!1)
        });
        this.glossaryService(n);
        this.glossary = ko.observable(new t(i));
        this.glossaryId = ko.observable()
    }, {
        get: function(n, t, i) {
            this.glossaryService() && this.glossary().get(this.glossaryService(), n, t, i)
        }
    })
});
Namespace.classdef("edgenuity.model.note.ObjectModel", function(n) {
    n(function() {
        this.Parent = "";
        this.Order = "";
        this.Name = "";
        this.ContextId = "";
        this.DynamicOrder = ""
    }, {
        populate: function(n) {
            this.Parent = n.Parent;
            this.Order = n.Order;
            this.Name = n.Name;
            this.ContextId = n.ContextID;
            this.DynamicOrder = n.DynamicOrder
        }
    })
});
Namespace.classdef("edgenuity.model.note.NoteModel", function(n) {
    n(function() {
        var n = this;
        this.NoteId = ko.observable();
        this.UserId = ko.observable();
        this.Content = ko.observable();
        this.Order = ko.observable();
        this.Bookmark = ko.observable()
    }, {
        populate: function(n) {
            this.NoteId(n.NoteId);
            this.UserId(n.UserId);
            this.Content(n.Content);
            this.Order(n.Order);
            this.Bookmark(n.Bookmark)
        },
        clear: function() {
            this.NoteId(null);
            this.UserId(null);
            this.Content(null);
            this.Order(null);
            this.Bookmark(null)
        },
        copy: function(n) {
            this.NoteId(n.NoteId());
            this.UserId(n.UserId());
            this.Content(n.Content());
            this.Order(n.Order());
            this.Bookmark(n.Bookmark())
        },
        isValid: function() {
            var n = new RegExp("<p>|&nbsp;|<\/p>","g");
            return this.Content() != null && $.trim(this.Content().replace(n, "")).length > 0
        }
    })
});
Namespace.classdef("edgenuity.model.note.NoteListModel", function(n) {
    var t = edgenuity.model.note.NoteModel;
    n(function() {
        this.Key = ko.observable();
        this.ContextId = ko.observable();
        this.UserId = ko.observable();
        this.Notes = ko.observableArray();
        this.hasNotes = ko.computed(function() {
            return this.Notes().length > 0
        }, this)
    }, {
        populate: function(n) {
            var i, u, f, r;
            this.Key(n.Key);
            this.ContextId(n.ContextId);
            this.UserId(n.UserKey);
            i = this.Notes;
            i.removeAll();
            for (u in n.Notes)
                f = n.Notes[u],
                r = new t,
                r.populate(f),
                i.push(r)
        },
        clear: function() {
            this.Key(null);
            this.ContextId(null);
            this.UserId(null);
            this.Notes.clear()
        },
        copy: function(n) {
            var i, r, f, e, u;
            this.Key(n.Key());
            this.ContextId(n.ContextId());
            this.UserId(n.UserId());
            i = this.Notes();
            i.removeAll();
            r = n.Notes();
            for (f in r)
                e = r[f],
                u = new t,
                u.copy(e),
                i.push(u)
        },
        PostNoteList: function(n, t, i) {
            n.Post("", ko.toJSON(this), {
                success: function(n, i, r) {
                    self.populate(n);
                    typeof t == "function" ? t(n, i, r) : !1
                },
                error: function(n, t, r) {
                    typeof i == "function" ? i(n, t, r) : !1
                },
                isJson: !0
            })
        },
        GetNoteList: function(n, t, i, r) {
            var u = this;
            n.Get("", {
                contextId: t
            }, {
                success: function(n, t, r) {
                    u.populate(n);
                    typeof i == "function" ? i(n, t, r) : !1
                },
                error: function(n, i, f) {
                    typeof r == "function" ? r(n, i, f) : !1;
                    u.populate({
                        ContextId: t
                    })
                },
                cache: !1
            })
        },
        DeleteNoteList: function(n, t, i, r) {
            var u = this;
            n.Delete("", {
                contextId: t
            }, {
                success: function(n, t, r) {
                    u.clear();
                    typeof i == "function" ? i(n, t, r) : !1
                },
                error: function(n, t, i) {
                    typeof r == "function" ? r(n, t, i) : !1
                }
            })
        },
        PostNote: function(n, t, i, r) {
            var u = this;
            n.Post("?contextId=" + this.ContextId(), ko.toJSON([t]), {
                success: function(n, r, f) {
                    t.populate(n[0]);
                    u.Notes.push(t);
                    typeof i == "function" ? i(n, r, f) : !1
                },
                error: function(n, t, i) {
                    typeof r == "function" ? r(n, t, i) : !1
                },
                isJSON: !0
            })
        },
        PutNote: function(n, t, i, r) {
            var u = this;
            n.Put("?contextId=" + this.ContextId(), ko.toJSON([t]), {
                success: function(n, r, u) {
                    n.length == 1 && t.populate(n[0]);
                    typeof i == "function" ? i(n, r, u) : !1
                },
                error: function(n, t, i) {
                    typeof r == "function" ? r(n, t, i) : !1
                },
                isJSON: !0
            })
        },
        DeleteNote: function(n, t, i, r) {
            var u = this;
            n.Delete("?contextId=" + this.ContextId() + "&noteId=" + t.NoteId(), null, {
                success: function(n, r, f) {
                    u.Notes.remove(t);
                    t.clear();
                    delete t;
                    typeof i == "function" ? i(n, r, f) : !1
                },
                error: function(n, t, i) {
                    typeof r == "function" ? r(n, t, i) : !1
                }
            })
        },
        GetNote: function(n, i, r, u) {
            var f = this;
            n.Get("", {
                contextId: this.ContextId,
                noteId: i
            }, {
                success: function(n, i, u) {
                    var f = null;
                    n.length == 1 && (f = new t,
                    f.populate(n[0]));
                    typeof r == "function" ? r(n, i, u, f) : !1
                },
                error: function(n, t, i) {
                    typeof u == "function" ? u(n, t, i) : !1
                }
            })
        }
    })
});
Namespace.classdef("edgenuity.model.note.LessonListModel", function(n) {
    var i = edgenuity.model.note.NoteListModel
      , r = edgenuity.model.note.NoteModel
      , u = edgenuity.model.note.ObjectModel
      , t = edgenuity.utility.TreeWidget
      , f = edgenuity.utility.Sort;
    n(function() {
        this.CourseName = ko.observable();
        this.IseNotesReadonly = ko.observable();
        this.IsNotesAllowed = ko.observable();
        this.Objects = [];
        this.Records = ko.observable();
        this.GradeBookObjectType = ko.observable();
        this.GradeId = ko.observable();
        this.assessmentNotesView = ko.observable(!1);
        this.assessmentLessonListView = ko.observable(!0);
        this.Notes = ko.observableArray();
        this.LessonName = ko.observable();
        this.hasNotes = ko.observable(!0);
        this.lessonTree = ko.observable(new t);
        this.lessonTreeSelect = function() {
            var n = Namespace.global().playerView.lessonPaneView();
            n.noteView().lessonList().GetNotesForAssessmentLesson(n.noteView().noteService(), this.ContextId, this.Name)
        }
        ;
        this.lessonTreeData = []
    }, {
        populate: function(n) {
            this.CourseName(n.RelatedeNotes.CourseName);
            this.IseNotesReadonly(n.RelatedeNotes.IseNotesReadonly);
            this.IsNotesAllowed(n.RelatedeNotes.IsNotesAllowed);
            this.GradeBookObjectType(n.RelatedeNotes.GradeBookObjectType);
            this.Objects = [];
            this.BuildObjects(this.Objects, n.RelatedeNotes.Objects);
            this.BuildRecords()
        },
        BuildObjects: function(n, t) {
            for (var r, i = 0; i < t.length; i++)
                r = new u,
                r.populate(t[i]),
                n.push(r)
        },
        BuildRecords: function() {
            this.lessonTree(new t(this.BuildTree()))
        },
        BuildTree: function() {
            var u = {}, i = [], r, n, t;
            this.Objects.sort(f.sortBy("DynamicOrder", !1, parseInt));
            for (r in this.Objects)
                this.Objects.hasOwnProperty(r) && (n = this.Objects[r],
                n && (n.select = this.lessonTreeSelect,
                u[n.Order] = n,
                t = u[n.Parent],
                t ? (t.Items = t.Items || [],
                t.Items.push(n)) : i.push(n)));
            return this.lessonTreeData = i,
            i
        },
        getLessons: function() {
            var i = this
              , n = []
              , t = function(n, t, i) {
                for (var r, u = 0; u < n.length; u++)
                    r = n[u],
                    r && (r.Items && r.Items.length ? i(r.Items, t, i) : t.push(r))
            };
            return t(this.lessonTreeData, n, t),
            n
        },
        hasSingleLesson: function() {
            var i = this
              , n = []
              , t = function(n, t, i) {
                for (var r, u = 0; u < n.length; u++)
                    if (t.length > 1)
                        break;
                    else
                        r = n[u],
                        r && (r.Items && r.Items.length ? i(r.Items, t, i) : t.push(r))
            };
            return t(this.lessonTreeData, n, t),
            {
                single: n.length == 1,
                first: n[0]
            }
        },
        GetLessonList: function(n, t, i, r) {
            var u = this;
            n.Get("", {
                id: t
            }, {
                success: function(n, t, r) {
                    u.populate(n);
                    typeof i == "function" ? i(n, t, r) : !1
                },
                error: function(n, t, i) {
                    typeof r == "function" ? r(n, t, i) : !1
                }
            })
        },
        PopulateNotesForAssessment: function(n, t) {
            var i, f, e, u;
            if (this.LessonName(t),
            n.Notes.length > 0) {
                this.hasNotes(!0);
                i = this.Notes;
                i.removeAll();
                for (f in n.Notes)
                    e = n.Notes[f],
                    u = new r,
                    u.populate(e),
                    i.push(u)
            } else
                this.hasNotes(!1)
        },
        GetNotesForAssessmentLesson: function(n, t, r, u, f) {
            var e = this
              , o = new i;
            o.GetNoteList(n, t, function(n) {
                e.PopulateNotesForAssessment(n, r);
                Namespace.forward(u)
            }, f);
            e.assessmentNotesView(!0);
            e.assessmentLessonListView(!1)
        },
        ShowLessonListView: function() {
            var n = this;
            n.assessmentNotesView(!1);
            n.assessmentLessonListView(!0)
        }
    })
});
Namespace.classdef("edgenuity.model.note.NoteViewModel", function(n) {
    var r = edgenuity.model.note.NoteListModel
      , t = edgenuity.model.note.NoteModel
      , i = edgenuity.model.note.LessonListModel;
    n(function(n, u) {
        var f = this;
        f.show = ko.observable(!0);
        f.allow = ko.observable(!1);
        f.loading = ko.observable(!1);
        f.noteService = ko.observable();
        f.hideENotes = ko.observable(initialization.InitialLaunchData.HideENotes);
        f.noteService.subscribe(function(n) {
            n || f.show(!1)
        });
        f.noteService(n);
        f.assessmentLessonListService = u;
        f.ContextId = ko.observable();
        f.noteList = ko.observable(new r);
        f.noteEdit = null;
        f.noteSearch = ko.observable();
        f.isEdit = ko.observable();
        f.wysiwygEnabled = !!($("#WYSIWYGEnabled").val() == "True") && !!(typeof CKEDITOR != "undefined" && !!CKEDITOR);
        f.lessonList = ko.observable(new i);
        f.assessmentLessonListView = ko.observable();
        f.ShowLessonsLink = ko.observable();
        f.ShowLessonSupportPane = ko.observable();
        f.hideGlossaryAndTranscript = ko.observable(!1);
        f.setFormNote = function(n) {
            if (f.wysiwygEnabled) {
                CKEDITOR.config.disableNativeSpellChecker = !1;
                edgenuity.wysiwyg.setData("notepad-form-editor", n.Content());
                var t = CKEDITOR.instances["notepad-form-editor"].document.$;
                edgenuity.wysiwyg.addEvent(t, "click", edgenuity.wysiwyg.onClickCapture);
                CKEDITOR.instances["notepad-form-editor"].getData().length > 0 && $("#saveButton").removeAttr("disabled").removeClass("disabled")
            } else
                $("#notepad-form-editor").val(n.Content()),
                n.Content().match(/[^\s]+/) && $("#saveButton").removeAttr("disabled").removeClass("disabled")
        }
        ;
        f.getFormNote = function() {
            var n = "", i;
            return f.wysiwygEnabled ? (CKEDITOR.config.disableNativeSpellChecker = !1,
            n = CKEDITOR.instances["notepad-form-editor"].getData()) : n = $("#notepad-form-editor").val(),
            f.isEdit() ? (n.length > 0 && f.noteEdit.Content(n),
            f.noteEdit) : (i = new t,
            n.length > 0 && i.Content(n),
            i)
        }
        ;
        f.getNotes = function(n) {
            f.ContextId(n);
            f.noteService() && f.noteList().GetNoteList(f.noteService(), n, function() {
                f.noteList.valueHasMutated()
            }, function() {
                f.noteList.valueHasMutated()
            })
        }
        ;
        f.addNote = function(n) {
            Actions.Log();
            f.noteService() && f.noteList().PostNote(f.noteService(), f.getFormNote(), function() {
                f.clear();
                f.scrollToBottom();
                !n || typeof n != "function" || n()
            }, function() {})
        }
        ;
        f.scrollToBottom = function() {
            var n = $("#notepad-display-pane");
            n.scrollTop(n[0].scrollHeight)
        }
        ;
        f.deleteNote = function() {
            Actions.Log();
            f.noteService() && f.noteList().DeleteNote(f.noteService(), f.getFormNote(), function() {
                f.clear()
            }, function() {})
        }
        ;
        f.editNote = function(n) {
            Actions.Log();
            f.noteEdit = n;
            f.isEdit(!0);
            f.setFormNote(n)
        }
        ;
        f.bookmark = function(n) {
            alert("Eventually jump to: " + n.Bookmark())
        }
        ;
        f.updateNote = function(n) {
            Actions.Log();
            f.noteService() && f.noteEdit && f.noteList().PutNote(f.noteService(), f.getFormNote(), function() {
                !n || typeof n != "function" || n();
                f.clear()
            }, function() {})
        }
        ;
        f.clear = function() {
            f.noteEdit = null;
            f.isEdit(!1);
            $("#notepad-form-editor").val("");
            $("#saveButton").attr("disabled");
            $("#saveButton").addClass("disabled");
            f.setFormNote(new t)
        }
        ;
        f.saveNote = function(n) {
            Actions.Log();
            f.wysiwygEnabled ? CKEDITOR.instances["notepad-form-editor"] != null && CKEDITOR.instances["notepad-form-editor"].getData().length > 0 && f.getFormNote().isValid() && (f.isEdit() ? f.updateNote(n) : f.addNote(n),
            CKEDITOR.instances["notepad-form-editor"].setData("")) : $("#notepad-form-editor").val().length > 0 && f.getFormNote().isValid() && (f.isEdit() ? f.updateNote(n) : f.addNote(n))
        }
        ;
        f.search = function() {}
        ;
        f.getLessonList = function(n, t, r, u) {
            var f = this
              , e = t;
            f.loading(!0);
            f.lessonList(new i);
            f.noteService && f.assessmentLessonListService ? f.lessonList().GetLessonList(f.assessmentLessonListService, n, function(n, t, i) {
                var h, c;
                if (f.loading(!1),
                n.RelatedeNotes.IseNotesReadonly && !n.RelatedeNotes.IsNotesAllowed)
                    f.ShowLessonsLink(!0),
                    f.allow(!1);
                else {
                    f.allow(!0);
                    var o = !0
                      , s = !1
                      , u = f.lessonList().hasSingleLesson();
                    u.single && (h = u.first.ContextId || e,
                    n.RelatedeNotes.IseNotesReadonly && (c = u.first.Name,
                    f.lessonList().GetNotesForAssessmentLesson(f.noteService(), h, c),
                    s = !0),
                    o = !1);
                    s || f.getNotes(e);
                    f.ShowLessonsLink(o)
                }
                typeof r == "function" ? r(n, t, i) : !1
            }, u) : f.noteService ? (f.getNotes(e),
            f.allow(!0),
            f.ShowLessonsLink(!1)) : f.loading(!1)
        }
    }, {})
});
Namespace.classdef("edgenuity.model.transcript.TranscriptModel", function(n) {
    n(function() {
        this.Rank = ko.observable();
        this.TimeBlocks = ko.observableArray()
    }, {
        populate: function(n) {
            for (this.Rank(n.Rank),
            i = 0; i < n.TimeBlocks.length; i++)
                n.TimeBlocks[i].BeginTime = n.TimeBlocks[i].BeginTime.substring(0, 8);
            this.TimeBlocks(n.TimeBlocks)
        }
    })
});
Namespace.classdef("edgenuity.model.transcript.TimeBlockModel", function(n) {
    n(function() {
        return null
        }
    })
});
Namespace.classdef("edgenuity.model.transcript.TimeBlockListModel", function(n) {
    var t = Namespace.using("edgenuity.model.transcript.TimeBlockModel");
    n(function() {
        return null
        }
    })
});
Namespace.classdef("edgenuity.model.transcript.TranscriptViewModel", function(n) {
    var t = Namespace.using("edgenuity.model.transcript.TranscriptModel");
    n(function(n) {
        var t = this;
        this.show = ko.observable(!0);
        this.transcriptService = ko.observable();
        this.transcriptService.subscribe(function(n) {
            n || t.show(!1)
        });
        this.transcriptService(n);
        this.TranscriptList = ko.observableArray();
        this.checkTabState = function() {
            this.TranscriptList().length == 0 ? this.show(!1) : this.show(!0)
        }
    }, {
        populate: function(n) {
            var i, r, u;
            for (this.TranscriptList.removeAll(),
            i = 0; i < n.length; i++)
                r = n[i],
                r && (u = new t,
                u.populate(r),
                this.TranscriptList.push(u))
        },
        getnew: function() {
            var n = this;
            this.transcriptService() && this.transcriptService().Get("transcript/getnewtranscript", {}, {
                success: function(t) {
                    n.populate(t)
                },
                error: function() {}
            })
        },
        gettranscripts: function(n) {
            var t = this;
            this.transcriptService() && this.transcriptService().Get("transcript/gettranscriptsbyactivityid", {
                id: n
            }, {
                success: function(n) {
                    n && (t.populate(n),
                    t.checkTabState())
                },
                error: function() {}
            })
        }
    })
});
Namespace.classdef("edgenuity.model.lessonpane.LessonPaneViewModel", function(n) {
    var t = Namespace.using("edgenuity.model.note.NoteViewModel")
      , i = Namespace.using("edgenuity.model.glossary.GlossaryViewModel")
      , r = Namespace.using("edgenuity.model.transcript.TranscriptViewModel")
      , u = Namespace.using("edgenuity.model.note.AssessmentLessonListViewModel");
    n(function(n, u, f, e, o) {
        var s = this;
        this.noteView = ko.observable(new t(n,e,this));
        this.glossaryView = ko.observable(new i(u,o));
        this.transcriptView = ko.observable(new r(f));
        this.neighborMarginRight = ko.observable(0);
        this.standardWidth = ko.observable(240);
        this.advancedWidth = ko.observable(480);
        this.width = ko.observable(this.standardWidth());
        this.right = ko.observable(-this.standardWidth());
        this.advanced = ko.observable(!1);
        this.advanced.subscribe(function(n) {
            typeof edgenuity != "undefined" && typeof edgenuity.wysiwyg != "undefined" && edgenuity.wysiwyg.enableToolbar(n);
            s.active() && s.open()
        });
        this.active = ko.observable(!1);
        this.mobile = ko.observable(!1);
        this.mobile.subscribe(function(n) {
            n && s.permission() && s.lazyLoad()
        });
        this.permission = ko.observable(!1);
        this.permission.subscribe(function(n) {
            n ? s.mobile() && s.lazyLoad() : s.active() && s.close()
        });
        this.animationSpeed = ko.observable(100);
        this.init = function() {
            $(document).ready(function() {
                var r = !!($("#WYSIWYGEnabled").val() == "True"), t = "notepad-form-editor", n = "#notepad-form-editor", u = $(n).length > 0, i;
                if (u)
                    if (r) {
                        edgenuity.wysiwyg.initializeToolbar(t, "Short", s.advanced());
                        CKEDITOR.config.disableNativeSpellChecker = !1;
                        CKEDITOR.on("instanceReady", function() {
                            var n = CKEDITOR.instances[t], r = n.getData(), i;
                            r.length == 0 && $("#saveButton").attr("disabled", "disabled").addClass("disabled");
                            i = function() {
                                setTimeout(function() {
                                    Actions.Log();
                                    n.getData().match(/[^\s]+/) ? $("#saveButton").removeAttr("disabled").removeClass("disabled") : $("#saveButton").attr("disabled", "disabled").addClass("disabled")
                                }, 0)
                            }
                            ;
                            n.on("key", i);
                            n.on("saveSnapshot", i);
                            console.log("LSP Initialized")
                        })
                    } else
                        i = $(n).val(),
                        i.length == 0 && $("#saveButton").attr("disabled", "disabled").addClass("disabled"),
                        $(n).bind("input propertychange", function() {
                            setTimeout(function() {
                                Actions.Log();
                                $(n).val().match(/[^\s]+/) ? $("#saveButton").removeAttr("disabled").removeClass("disabled") : $("#saveButton").attr("disabled", "disabled").addClass("disabled")
                            }, 0)
                        })
            });
            s.initCalled = !0
        }
        ;
        this.initCalled = !1;
        this.lazyLoadCallback = null;
        this.lazyLoad = function(n) {
            n && (s.lazyLoadCallback = n);
            (s.active() || s.mobile()) && s.lazyLoadCallback && (s.initCalled || s.init(),
            s.lazyLoadCallback(),
            s.lazyLoadCallback = null)
        }
        ;
        this.getNotes = function(n) {
            s.noteView().getNotes(n)
        }
        ;
        this.saveNotes = function(n) {
            Actions.Log();
            s.noteView() != null && s.noteView().saveNote(n)
        }
        ;
        this.getLessonList = function(n, t, i, r) {
            s.noteView().getLessonList(n, t, function() {
                Namespace.forward(s, i)
            }, function() {
                Namespace.forward(s, r)
            })
        }
        ;
        this.clickTrigger = function() {
            s.active() ? s.close() : s.open()
        }
        ;
        this.clickAdvanced = function() {
            s.advanced() ? s.advanced(!1) : s.advanced(!0)
        }
        ;
        this.open = function() {
            var n = s.standardWidth();
            s.advanced() && (n = s.advancedWidth());
            s.neighborMarginRight(n);
            s.width(n);
            s.right(0);
            s.active(!0);
            s.lazyLoad()
        }
        ;
        this.close = function() {
            var n = s.standardWidth();
            s.advanced() && (n = s.advancedWidth());
            s.neighborMarginRight(0);
            s.width(n);
            s.right(-n);
            s.active(!1)
        }
    }, {
        populate: function(n) {
            this.notes(n.notes)
        }
    })
});
Namespace.classdef("edgenuity.model.player.ToolbarModel", function(n) {
    n(function(n, t, i) {
        var r = this, u;
        r.toolsService = i;
        this.initialize = function(n, t) {
            $.ajaxSetup({
                cache: !0
            });
            var i = function(t, f) {
                t < n.scripts.length ? $.getScript(n.scripts[t], function() {
                    i(t + 1, f)
                }) : typeof f == "function" && (n.highlight && edgenuity && edgenuity.createHighlights ? n.highlight && edgenuity && edgenuity.createHighlights && (u = edgenuity.createHighlights(n.highlight),
                r.Highlights = u) : r.displayHighlights(!1),
                f())
            };
            n.scripts && n.scripts.length > 0 && i(0, t)
        }
        ;
        r.HighlightYellow = function() {
            u.yellowHighlight();
            Actions.Log()
        }
        ;
        r.HighlightCyan = function() {
            u.blueHighlight();
            Actions.Log()
        }
        ;
        r.HighlightMagenta = function() {
            u.redHighlight();
            Actions.Log()
        }
        ;
        r.HighlightGreen = function() {
            u.greenHighlight();
            Actions.Log()
        }
        ;
        r.ClearAllHighlights = function() {
            u.removeHighlights();
            Actions.Log()
        }
        ;
        r.setAnnotationID = function() {
            u.setSaveID();
            Actions.Log()
        }
        ;
        this.displayHighlights = ko.observable(!0);
        this.tools = ko.observableArray();
        this.references = ko.observableArray();
        this.showAudio = ko.observable(!1);
        this.audioPlaying = ko.observable(!1);
        this.audioSpeed = [{
            name: "Normal",
            speed: 40
        }, {
            name: "Fast",
            speed: 55
        }, {
            name: "Slow",
            speed: 25
        }];
        this.choosenSpeed = ko.observable(40);
        this.choosenSpeed.subscribe(function(n) {
            r.setSpeedValue(window, n)
        });
        r.setSpeedValue = function(n, t) {
            n.$rw_setSpeedValue && n.$rw_setSpeedValue(t)
        }
    }, {
        populate: function(n) {
            var t, i;
            for (this.tools.removeAll(),
            this.references.removeAll(),
            t = 0; t < n.Tools.length; t++)
                i = new edgenuity.model.player.Tool,
                i.name(n.Tools[t].Value),
                i.displayname(n.Tools[t].DisplayName),
                i.width(n.Tools[t].Width),
                i.height(n.Tools[t].Height),
                i.flash(n.Tools[t].IsFlash),
                i.link(n.Tools[t].ToolLink),
                i.offsetLeft(n.Tools[t].IconOffsetLeft),
                i.offsetTop(n.Tools[t].IconOffsetTop),
                i.image(n.Tools[t].BackgroundImage),
                this.tools.push(i);
            for (t = 0; t < n.References.length; t++)
                i = new edgenuity.model.player.Tool,
                i.name(n.References[t].Value),
                i.displayname(n.References[t].DisplayName),
                i.width(n.References[t].Width),
                i.height(n.References[t].Height),
                i.flash(n.References[t].IsFlash),
                i.link(n.References[t].ToolLink),
                i.offsetLeft(n.References[t].IconOffsetLeft),
                i.offsetTop(n.References[t].IconOffsetTop),
                i.image(n.References[t].BackgroundImage),
                this.references.push(i);
            this.BindToolbar()
        },
        get: function(n, t, i) {
            var r = this;
            r.toolsService && r.toolsService.Get("", {
                id: n
            }, {
                success: function(n, i, u) {
                    r.populate(n);
                    typeof t == "function" ? t(n, i, u) : !1
                },
                error: function(n, t, r) {
                    typeof i == "function" ? i(n, t, r) : !1
                }
            })
        },
        playAudio: function() {
            Actions.Log();
            var n = this;
            n.audioPlaying() ? $rw_isSpeaking() && (n.audioPlaying(!1),
            $rw_event_pause()) : (n.audioPlaying(!0),
            $rw_setVoice(Namespace.global().playerView.Translator().currentLanguage().voice),
            $rw_event_play())
        },
        StopAudio: function() {
            Actions.Log();
            var n = this;
            $rw_stopSpeech();
            n.audioPlaying(!1)
        },
        OpenCalculator: function(n) {
            var t, f;
            Actions.Log();
            typeof n.tools != "undefined" && (n = n.tools()[0]);
            var i = n.link()
              , o = n.name()
              , r = n.width()
              , u = n.height()
              , e = n.name().toUpperCase();
            if (n.flash() && (t = "",
            !FlashDetect.installed)) {
                if (isMobile.any()) {
                    if (e == "GRAPHCALC") {
                        window.open("https://www.desmos.com/calculator");
                        return
                    }
                    t = "This reference is not compatible with the mobile device you are using. Please complete this activity on a computer."
                } else
                    t = "This reference requires Flash. Please install Adobe Flash.";
                alert(t);
                return
            }
            return f = "top=0, left=0, " + (u == 0 || r == 0 ? "fullscreen=1,width=" + screen.width + ",height=" + screen.height : "width=" + u + ",height=" + r) + ", scrollbars=1, resizable=1",
            i != null && (calwindow = window.open(i, "_blank", f, !0),
            calwindow.moveTo(0, 0)),
            !1
        },
        OpenReference: function(n) {
            var u;
            Actions.Log();
            typeof n.references != "undefined" && (n = n.references()[0]);
            var t = n.link()
              , f = n.name()
              , i = n.width()
              , r = n.height()
              , e = n.name().toUpperCase();
            if (n.flash() && !FlashDetect.installed) {
                errmsg = isMobile.any() ? "This reference is not compatible with the mobile device you are using. Please complete this activity on a computer." : "This reference requires Flash. Please install Adobe Flash.";
                alert(errmsg);
                return
            }
            return u = "top=0, left=0, " + (r == 0 || i == 0 ? "fullscreen=1,width=" + screen.width + ",height=" + screen.height : "width=" + r + ",height=" + i) + ", scrollbars=1, resizable=1",
            t != null && (calwindow = window.open(t, "_blank", u, !0),
            calwindow.moveTo(0, 0)),
            !1
        },
        BindToolbar: function() {
            var n = $("html").is(".touch")
              , t = $("html").is(".cssanimations");
            $(".no-touch .audio.dropdown select").on("click", function(i) {
                if (Actions.Log(),
                i.preventDefault(),
                i.stopPropagation(),
                $(this).data("focused"))
                    if ($(this).data("focused", !1),
                    t)
                        $(this).parent().parent().css({
                            height: "0px",
                            width: "0px"
                        }).parent().removeClass("active");
                    else {
                        var r = !window.orientation & n;
                        r ? $(this).parent().parent().stop().animate({
                            height: "0px",
                            width: "54px"
                        }).removeClass("active") : $(this).parent().parent().stop().animate({
                            height: "45px",
                            width: "0px"
                        }).removeClass("active")
                    }
                else
                    $(this).data("focused", !0)
            });
            $(".touch .audio.dropdown select").on("change blur", function(n) {
                Actions.Log();
                n.preventDefault();
                n.stopPropagation();
                $(this).data("focused", !1);
                t ? $(this).parent().parent().css({
                    height: "0px",
                    width: "0px"
                }).parent().removeClass("active") : $(this).parent().parent().stop().animate({
                    height: "0px",
                    width: "0px"
                }).removeClass("active")
            });
            if (n)
                $(".toolbar > li").on("click", function() {
                    var i = $(this), r, u, f;
                    Actions.Log();
                    $(".audio .dropdown select").is(":focus") || (screenOrientation = $(window).width() > $(window).height() ? 90 : 0,
                    r = !screenOrientation & n,
                    i.hasClass("active") ? t ? i.removeClass("active").find("ul").css({
                        height: "0px",
                        width: "0px"
                    }) : i.removeClass("active").find("ul").stop().animate({
                        height: "0px",
                        width: "0px"
                    }) : (u = i.find("ul > li").size(),
                    i.find("ul > li").show(),
                    f = {
                        height: r ? u * 45 + "px" : "45px",
                        width: r ? "54px" : u * 54 + (i.hasClass("audio") ? 260 : 0) + "px"
                    },
                    t ? (i.find("ul").css(f),
                    i.siblings().removeClass("active").find("ul").css({
                        height: "0px",
                        width: "0px"
                    })) : (i.find("ul").stop().animate(f, "fast"),
                    i.siblings().removeClass("active").each(function() {
                        $(this).find("ul").stop().animate({
                            height: "0px",
                            width: "0px"
                        }, "fast")
                    })),
                    i.addClass("active")))
                });
            else {
                Actions.Log();
                $(".toolbar > li > ul > li:first").hide();
                $(".toolbar > li").on({
                    mouseenter: function() {
                        var i = $(this), f = i.find("ul > li"), e = f.size(), u = !window.orientation & n, r;
                        f.show();
                        n || (i.attr("id") == "tools-calc" || i.attr("id") == "tools-res") && i.find("ul").addClass("alignLeft");
                        r = {
                            height: u ? e * 45 + "px" : "45px",
                            width: u ? "54px" : e * 54 + (i.hasClass("audio") ? 260 : 0) + "px"
                        };
                        t ? (i.find("ul").css(r),
                        i.siblings().removeClass("active").find("ul").css({
                            height: "0px",
                            width: "0px"
                        })) : (u ? i.find("ul").css("width", r.width) : i.find("ul").css("height", r.height),
                        i.find("ul").stop().animate(r, "fast"),
                        u ? (r.height = "0px",
                        r.width = "54px") : (r.width = "0px",
                        r.height = "45px"),
                        i.siblings().removeClass("active").each(function() {
                            $(this).find("ul").stop().animate(r, "fast")
                        }));
                        i.addClass("active");
                        i.find("ul > li").each(function() {
                            ($(this).find("a").length > 0 || $(this).find("select").length > 0) && $(this).attr("tabindex", "0")
                        })
                    },
                    mouseleave: function() {
                        if (!$(".audio .dropdown select").is(":focus"))
                            if (t)
                                $(this).removeClass("active").find("ul").css({
                                    height: "0px",
                                    width: "0px"
                                });
                            else {
                                var i = !window.orientation & n;
                                i ? $(this).removeClass("active").find("ul").stop().animate({
                                    height: "0px",
                                    width: "54px"
                                }) : $(this).removeClass("active").find("ul").stop().animate({
                                    height: "45px",
                                    width: "0px"
                                })
                            }
                        $(this).find("ul > li").attr("tabindex", "-1")
                    }
                })
            }
            $("ul.toolbar > li").bind("keydown", function(n) {
                n.keyCode === 13 && ($(this).hasClass("active") ? $(this).trigger("mouseleave") : $(this).trigger("mouseenter"))
            });
            $("ul.toolbar > li > ul > li").bind("keydown", function(n) {
                n.keyCode === 13 && ($(this).find("a").length > 0 && $(this).find("a").click(),
                $(this).find("select").length > 0 && console.log("trigger select menu to open"),
                n.stopPropagation())
            });
            $("ul.toolbar > li > ul > li > a").attr("tabindex", "-1");
            $("ul.toolbar > li > ul > li > select").attr("tabindex", "-1");
            $("ul.toolbar > li > a").attr("tabindex", "-1");
            $("ul.toolbar > li:visible").attr("tabindex", "0")
        },
        showHighlights: function(n) {
            this.displayHighlights(n)
        }
    })
});
Namespace.classdef("edgenuity.model.player.Tool", function(n) {
    n(function() {
        this.name = ko.observable();
        this.displayname = ko.observable();
        this.width = ko.observable();
        this.height = ko.observable();
        this.flash = ko.observable(!1);
        this.link = ko.observable();
        this.image = ko.observable();
        this.offsetLeft = ko.observable();
        this.offsetTop = ko.observable()
    }, {})
});
Namespace.classdef("edgenuity.model.player.UserModel", function(n) {
    n(function() {
        var n = this;
        this.FirstName = ko.observable();
        this.LastName = ko.observable();
        this.UserID = ko.observable();
        this.SchoolName = ko.observable();
        this.SchoolID = ko.observable();
        this.DistrictName = ko.observable();
        this.FullName = ko.computed(function() {
            return this.FirstName() + " " + this.LastName()
        }, this);
        this.userMenu = ko.observable(!1);
        this.toggleUserMenu = function() {
            n.userMenu(!n.userMenu())
        }
    }, {
        populate: function(n) {
            this.FirstName(n.FirstName);
            this.LastName(n.LastName);
            this.SchoolName(n.SchoolName);
            this.SchoolID(n.SchoolID);
            this.DistrictName(n.DistrictName);
            this.UserID(n.UserID)
        },
        clear: function() {
            this.FirstName(null);
            this.LastName(null)
        }
    })
});
Namespace.classdef("edgenuity.model.player.StageViewModel", function(n) {
    n(function(n) {
        var t, u;
        const i = "500px"
          , r = "800px";
        t = this;
        this.Title = ko.observable();
        this.Url = ko.observable();
        this.ActivityName = ko.observable();
        this.ActivityStatus = ko.observable();
        this.ActivityOrder = ko.observable();
        this.CourseName = ko.observable();
        this.ContextID = ko.observable();
        this.LMSCourseID = ko.observable();
        this.height = ko.observable(i);
        this.width = ko.observable(r);
        this.nextEnabled = ko.observable();
        this.prevEnabled = ko.observable();
        this.ObjectType = ko.observable("");
        this.windowHeight = ko.observable(window.innerHeight);
        this.windowWidth = ko.observable(window.innerWidth);
        this.useLargePlayerFlag = ko.observable(initialization.InitialLaunchData.UseLargePlayer);
        this.isNova = ko.computed(()=>this.ObjectType() === "NA");
        this.isLtiLink = ko.computed(()=>this.ObjectType() === "LL");
        window.addEventListener("resize", ()=>{
            this.windowHeight(window.innerHeight),
            this.windowWidth(window.innerWidth)
        }
        );
        this.useLargePlayer = ko.computed(()=>t.windowHeight() > t.windowWidth() ? !1 : this.isNova() || this.isLtiLink() || this.useLargePlayerFlag());
        u = function() {
            var u, f, e;
            if (t.useLargePlayer()) {
                screen.width > 768 && t.height("calc(100vh - 100px)");
                return
            }
            if (t.ObjectType().startsWith("A")) {
                t.height(i);
                t.width(r);
                return
            }
            try {
                u = n.document;
                u && u.body && (f = Math.max(u.body.scrollHeight, u.documentElement ? Math.max(u.documentElement.scrollHeight, u.documentElement.offsetHeight, u.documentElement.clientHeight) : 0, u.body.clientHeight, u.body.offsetHeight),
                e = Math.max(u.body.scrollWidth, u.documentElement ? Math.max(u.documentElement.scrollWidth, u.documentElement.offsetWidth, u.documentElement.clientWidth) : 0, u.body.clientWidth, u.body.offsetWidth, 800),
                t.height(f + "px"),
                t.width(e + "px"))
            } catch (o) {
                clearInterval(t.stageFrameInterval);
                t.stageFrameInterval = 0
            }
        }
        ;
        this.TryStartStageFrameInterval = function(i, r) {
            !i || t.width(i + "px");
            t.stageFrameInterval && (clearInterval(t.stageFrameInterval),
            t.stageFrameInterval = 0);
            var f = r;
            try {
                f = n.document
            } catch (e) {}
            f != r && (t.stageFrameInterval = setInterval(u, 1e3))
        }
        ;
        t.TryStartStageFrameInterval()
    }, {
        populate: function(n) {
            this.Title(n.LessonName);
            this.ActivityName(n.ActivityName);
            this.ActivityOrder(n.ActivityOrder);
            this.ActivityStatus(n.ActivityStatus);
            this.nextEnabled(n.NextActivity && n.NextActivity.ActivityOrder != "00000000-0000-0000-0000-000000000000" && n.ActivityStatus == "Complete");
            this.prevEnabled(n.PrevActivity && n.PrevActivity.ActivityOrder != "00000000-0000-0000-0000-000000000000")
        },
        clear: function() {
            this.Title(null);
            this.Url(null)
        },
        loadUrl: function(n) {
            this.Url(n);
            this.Url.valueHasMutated()
        },
        getOrigin: function() {
            var n = new URL(this.Url());
            return n.origin
        }
    })
});
Namespace.classdef("edgenuity.model.player.GradeBarModel", function(n) {
    n(function(n, t, i) {
        var r = this;
        this.feedbackService = n;
        this.scoreService = t;
        this.gradeService = i;
        this.Grade = ko.observable("");
        this.Counted = ko.observable();
        this.NumAttempts = ko.observable();
        this.PassingThreshold = ko.observable();
        this.Pending = ko.observable();
        this.Processing = ko.observable();
        this.GradeString = ko.computed({
            read: function() {
                return r.Counted() ? r.OverrideText() != null ? r.OverrideText() : format("0.#", r.Grade()) + "<sup>%<\/sup>" : r.OverrideText() != null ? r.OverrideText() : "Completed"
            },
            deferEvaluation: !0
        });
        this.Passed = ko.computed(function() {
            return r.Grade() >= r.PassingThreshold()
        });
        this.TimeSubmitted = ko.observable();
        this.FeedbackAvailable = ko.observable(!1);
        this.FeedbackUnread = ko.observable(!1);
        this.CurrentTab = ko.observable(null);
        this.feedback = ko.observableArray();
        this.Visible = ko.observable(!1);
        this.OverrideText = ko.observable();
        this.rubricState = ko.observable(0);
        this.RubricButtonState = ko.computed(function() {
            var n = ko.utils.unwrapObservable(r.rubricState);
            return n && n != 0 ? r.CurrentTab() == "rubric" ? "rubric-active" + (n == 1 ? " rubric-glow" : "") : n == 1 ? "rubric-glow" : n == 2 ? "rubric" : "" : ""
        });
        this.feedbackState = ko.observable(0);
        this.FeedbackButtonState = ko.computed(function() {
            var n = ko.utils.unwrapObservable(r.feedbackState);
            return !n || n == 0 ? "" : r.CurrentTab() == "feedback" ? "feedback-active" : " " + (n == 1 ? "feedback-glow" : n == 2 ? "feedback" : "")
        });
        this.rubricItems = ko.observableArray()
    }, {
        populate: function(n) {
            this.Grade(n.Grade);
            this.Counted(n.Counted);
            this.NumAttempts(n.NumAttempts);
            this.PassingThreshold(n.PassingThreshold);
            this.Pending(n.Pending);
            this.Processing(n.Processing);
            this.TimeSubmitted(n.TimeSubmitted);
            this.FeedbackAvailable(n.Feedback > 0 & !!this.feedbackService);
            this.FeedbackUnread(n.Feedback == 1 & !!this.feedbackService);
            this.Visible(n.Visible);
            this.OverrideText(n.OverrideText)
        },
        clear: function() {
            this.Grade(null);
            this.Counted(null);
            this.NumAttempts(null);
            this.PassingThreshold(null);
            this.Pending(null);
            this.Processing(null);
            this.TimeSubmitted(null);
            this.Visible(!1);
            this.OverrideText(null);
            this.CurrentTab(null)
        },
        get: function(n, t, i) {
            var r = this
              , u = {};
            !n || (this.scoreService.Get("GetScoreStatus", {
                ConsumerKey: initialization.InitialActivityData.ConsumerKey,
                UserID: initialization.InitialLaunchData.UserID,
                Role: initialization.InitialLaunchData.Role,
                ContextID: initialization.InitialLaunchData.ContextID,
                ResourceLinkID: initialization.InitialLaunchData.ResourceLinkID,
                LearningObjectKey: initialization.InitialLaunchData.LearningObjectKey
            }, {
                success: function(n) {
                    u.Grade = n.Score;
                    r.rubricState(n.IntellimetricReadStatus)
                },
                error: function() {}
            }),
            this.gradeService.Get("", {
                CurrentAttemptID: n
            }, {
                success: function(n, i, u) {
                    r.populate(n.GradeBarInfo);
                    typeof t == "function" ? t(n, i, u) : !1
                },
                error: function(n, t, r) {
                    typeof i == "function" ? i(n, t, r) : !1
                }
            }))
        },
        getFeedback: function() {
            var n = this;
            n.CurrentTab() == "feedback" ? n.CurrentTab(null) : (n.CurrentTab("feedback"),
            n.feedback.removeAll(),
            !n.feedbackService || n.feedbackService.Get("", {
                UserID: initialization.InitialLaunchData.UserID,
                ContextID: initialization.InitialLaunchData.ContextID,
                ActivityOrder: initialization.InitialActivityData.ActivityOrder,
                markRead: !0
            }, {
                success: function(t) {
                    var i, r;
                    if (t.Comments && (t = t.Comments),
                    Object.prototype.toString.call(t) === "[object Array]")
                        for (i = 0; i < t.length; i++)
                            r = new Date(t[i].CommentDate),
                            n.feedback.push({
                                tag: t[i].Tag || "",
                                user: t[i].TeacherName,
                                date: r.getMonth() + 1 + "/" + r.getDate() + "/" + r.getFullYear(),
                                time: (r.getHours() % 12 | 12) + ":" + r.getMinutes() + " " + r.getHours() > 11 ? "PM" : "AM",
                                text: t[i].Comment,
                                audio: t[i].AudioComment
                            });
                    else
                        n.feedback.push(t);
                    n.FeedbackUnread(!1)
                },
                error: function() {
                    n.feedback.push({
                        tag: "",
                        text: "Error Loading Feedback data",
                        time: "",
                        date: "",
                        user: ""
                    })
                }
            }))
        },
        getRubric: function() {
            var n = this;
            n.CurrentTab() == "rubric" ? n.CurrentTab(null) : (n.CurrentTab("rubric"),
            n.rubricItems.removeAll(),
            this.scoreService.Get("GetScores", {
                ConsumerKey: initialization.InitialActivityData.ConsumerKey,
                UserID: initialization.InitialLaunchData.UserID,
                Role: initialization.InitialLaunchData.Role,
                ContextID: initialization.InitialLaunchData.ContextID,
                ResourceLinkID: initialization.InitialLaunchData.ResourceLinkID,
                LearningObjectKey: initialization.InitialLaunchData.LearningObjectKey
            }, {
                success: function(t) {
                    n.rubricState(t.IntellimetricReadStatus);
                    n.rubricItems.push({
                        score: t.IntellimetricInfo.Focus,
                        maxScore: 6,
                        name: "Focus",
                        weight: t.IntellimetricInfo.FocusPerentage,
                        scoreDescription: t.IntellimetricInfo.FocusGradeLevel,
                        description: t.IntellimetricInfo.FocusGradeDescription
                    });
                    n.rubricItems.push({
                        score: t.IntellimetricInfo.Content,
                        maxScore: 6,
                        name: "Content and Development",
                        weight: t.IntellimetricInfo.ContentPerentage,
                        scoreDescription: t.IntellimetricInfo.ContentGradeLevel,
                        description: t.IntellimetricInfo.ContentGradeDescription
                    });
                    n.rubricItems.push({
                        score: t.IntellimetricInfo.Organization,
                        maxScore: 6,
                        name: "Organization",
                        weight: t.IntellimetricInfo.OrganizationPerentage,
                        scoreDescription: t.IntellimetricInfo.OrganizationGradeLevel,
                        description: t.IntellimetricInfo.OrganizationGradeDescription
                    });
                    n.rubricItems.push({
                        score: t.IntellimetricInfo.Language,
                        maxScore: 6,
                        name: "Language Use, Voice and Style",
                        weight: t.IntellimetricInfo.LanguagePerentage,
                        scoreDescription: t.IntellimetricInfo.LanguageGradeLevel,
                        description: t.IntellimetricInfo.LanguageGradeDescription
                    });
                    n.rubricItems.push({
                        score: t.IntellimetricInfo.Mechanics,
                        maxScore: 6,
                        name: "Mechanics and Conventions",
                        weight: t.IntellimetricInfo.MechanicsPerentage,
                        scoreDescription: t.IntellimetricInfo.MechanicsGradeLevel,
                        description: t.IntellimetricInfo.MechanicsGradeDescription
                    })
                },
                error: function() {}
            }))
        }
    })
});
Namespace.classdef("edgenuity.model.player.StudentSupportModel", function(n) {
    n(function() {}, {
        populate: function() {},
        lpAddMonitorTag: function(n) {
            window.lpTag = window.lpTag || {};
            typeof window.lpTag._tagCount == "undefined" ? (window.lpTag = {
                site: "10638900",
                section: lpTag.section || "",
                autoStart: lpTag.autoStart === !1 ? !1 : !0,
                ovr: lpTag.ovr || {},
                _v: "1.5.1",
                _tagCount: 1,
                protocol: location.protocol,
                events: {
                    bind: function(n, t, i) {
                        lpTag.defer(function() {
                            lpTag.events.bind(n, t, i)
                        }, 0)
                    },
                    trigger: function(n, t, i) {
                        lpTag.defer(function() {
                            lpTag.events.trigger(n, t, i)
                        }, 1)
                    }
                },
                defer: function(n, t) {
                    t == 0 ? (this._defB = this._defB || [],
                    this._defB.push(n)) : t == 1 ? (this._defT = this._defT || [],
                    this._defT.push(n)) : (this._defL = this._defL || [],
                    this._defL.push(n))
                },
                load: function(n, t, i) {
                    var r = this;
                    setTimeout(function() {
                        r._load(n, t, i)
                    }, 0)
                },
                _load: function(n, t, i) {
                    var u = n, r;
                    n || (u = this.protocol + "//" + (this.ovr && this.ovr.domain ? this.ovr.domain : "lptag.liveperson.net") + "/tag/tag.js?site=" + this.site);
                    r = document.createElement("script");
                    r.setAttribute("charset", t ? t : "UTF-8");
                    i && r.setAttribute("id", i);
                    r.setAttribute("src", u);
                    document.getElementsByTagName("head").item(0).appendChild(r)
                },
                init: function() {
                    this._timing = this._timing || {};
                    this._timing.start = (new Date).getTime();
                    var n = this;
                    window.attachEvent ? window.attachEvent("onload", function() {
                        n._domReady("domReady")
                    }) : (window.addEventListener("DOMContentLoaded", function() {
                        n._domReady("contReady")
                    }, !1),
                    window.addEventListener("load", function() {
                        n._domReady("domReady")
                    }, !1));
                    typeof _lptStop == "undefined" && this.load()
                },
                start: function() {
                    this.autoStart = !0
                },
                _domReady: function(n) {
                    this.isDom || (this.isDom = !0,
                    this.events.trigger("LPT", "DOM_READY", {
                        t: n
                    }));
                    this._timing[n] = (new Date).getTime()
                },
                vars: lpTag.vars || [],
                dbs: lpTag.dbs || [],
                ctn: lpTag.ctn || [],
                sdes: lpTag.sdes || [],
                ev: lpTag.ev || []
            },
            lpTag.sdes.push({
                type: "personal",
                personal: {
                    firstname: n.user().FirstName(),
                    lastname: n.user().LastName(),
                    company: "[District Name]: " + n.user().DistrictName() + "  /   [School Name]: " + n.user().SchoolName() + "  /  [School ID]: " + n.user().SchoolID()
                }
            }),
            lpTag.sdes.push({
                type: "ctmrinfo",
                info: {
                    cstatus: "",
                    ctype: "Student",
                    customerId: n.user().UserID(),
                    balance: "",
                    socialId: "",
                    imei: "",
                    userName: "",
                    accountName: "[Course Name]: " + n.stageView().CourseName() + "   /  [Student Build ID]: " + n.stageView().LMSCourseID() + "  /  [Activity Order]: " + n.stageView().ActivityOrder(),
                    role: "",
                    lastPaymentDate: {},
                    registrationDate: {}
                }
            }),
            lpTag.init()) : window.lpTag._tagCount += 1
        }
    })
});
Namespace.classdef("edgenuity.model.player.TimeoutModel", function(n) {
    n(function(n, t, i) {
        function h(n, t, i) {
            return i = i || "0",
            n = n + "",
            n.length >= t ? n : new Array(t - n.length + 1).join(i) + n
        }
        var u = (new Date).getTime(), f = n, r = this, e = t, s = i, o;
        this.GetDisplayTime = function(n) {
            var i = f - (n - u)
              , t = Math.floor(i / 1e3);
            return Math.floor(t / 60) + ":" + h(t % 60, 2)
        }
        ;
        o = 0;
        this.start = function(n, t, i) {
            n && (f = n);
            t && (e = t);
            i && (s = i);
            u = (new Date).getTime();
            r.display(r.GetDisplayTime(u));
            o = setInterval(function() {
                var n = (new Date).getTime();
                n - u >= f ? e() : r.display(r.GetDisplayTime(n))
            }, 1e3);
            r.running(!0)
        }
        ;
        this.stop = function() {
            clearInterval(o);
            r.running(!1)
        }
        ;
        this.chooseNo = function() {
            e()
        }
        ;
        this.chooseYes = function() {
            s()
        }
        ;
        this.display = ko.observable(this.GetDisplayTime((new Date).getTime()));
        this.running = ko.observable(!1)
    }, {})
});
Namespace.classdef("edgenuity.model.translation.TranslatorViewModel", function(n) {
    n(function() {
        function l() {
            u("span", /٪ ufffd/, " ", "gi");
            u("span", /% ufffd/, " ", "gi");
            u("span", /٪ u2014/, " ", "gi");
            u("span", /% u2014/, " ", "gi");
            u("span", /٪ u2714/, " ", "gi");
            u("span", /% u2714/, " ", "gi")
        }
        function u(n, t, i, r) {
            var u, f;
            u = window.document.getElementById("stageFrame").contentWindow.document.getElementById("iFramePreview") ? $($(window.document.getElementById("stageFrame").contentWindow.document.getElementById("iFramePreview").contentWindow.document).find(n)) : $($(window.document.getElementById("stageFrame").contentWindow.document).find(n));
            f = new RegExp(t,r);
            u.each(function() {
                $(this).children().length || $(this).text($(this).text().replace(f, i))
            })
        }
        var n = [{
            name: "English",
            sortable: !1,
            nativeName: "English",
            googleAbbr: "en",
            voice: "Ava"
        }, {
            name: "Spanish",
            sortable: !1,
            nativeName: "Español",
            googleAbbr: "es",
            voice: "Paulina"
        }, {
            name: "French",
            sortable: !1,
            nativeName: "Française",
            googleAbbr: "fr",
            voice: "Audrey"
        }, {
            name: "Italian",
            sortable: !1,
            nativeName: "Italiano",
            googleAbbr: "it",
            voice: "Alice"
        }, {
            name: "German",
            sortable: !1,
            nativeName: "Deutsch",
            googleAbbr: "de",
            voice: "Anna"
        }, {
            name: "Portuguese",
            sortable: !1,
            nativeName: "Português",
            googleAbbr: "pt",
            voice: "Joana"
        }, {
            name: "Arabic",
            sortable: !1,
            nativeName: "العربية",
            googleAbbr: "ar",
            voice: "Tarik"
        }, {
            name: "Armenian",
            nativeName: "հայերէն",
            googleAbbr: "hy"
        }, {
            name: "Chinese",
            nativeName: "汉语/漢語",
            googleAbbr: "zh-cn"
        }, {
            name: "Haitian Creole",
            nativeName: "Kreyól ayisyen",
            googleAbbr: "ht"
        }, {
            name: "Hindi",
            nativeName: "मानक हिन्दी",
            googleAbbr: "hi"
        }, {
            name: "Japanese",
            nativeName: "日本語",
            googleAbbr: "ja"
        }, {
            name: "Korean",
            nativeName: "한국어",
            googleAbbr: "ko"
        }, {
            name: "Filipino",
            nativeName: "Filipino",
            googleAbbr: "tl"
        }, {
            name: "Polish",
            nativeName: "polski",
            googleAbbr: "pl"
        }, {
            name: "Russian",
            nativeName: "Pyccĸий",
            googleAbbr: "ru"
        }, {
            name: "Thai",
            nativeName: "ภาษาไทย",
            googleAbbr: "th"
        }, {
            name: "Vietnamese",
            nativeName: "Tiếng Việt",
            googleAbbr: "vi"
        }, {
            name: "Somali",
            nativeName: "Somali",
            googleAbbr: "so"
        }, {
            name: "Amharic",
            nativeName: "አማርኛ",
            googleAbbr: "am"
        }, {
            name: "Bengali",
            nativeName: "বাংলা",
            googleAbbr: "bn"
        }, {
            name: "Bosnian",
            nativeName: "босански",
            googleAbbr: "bs"
        }, {
            name: "Croatian",
            nativeName: "Hrvatski",
            googleAbbr: "hr"
        }, {
            name: "Czech",
            nativeName: "čeština",
            googleAbbr: "cs"
        }, {
            name: "Danish",
            nativeName: "Dansk",
            googleAbbr: "da"
        }, {
            name: "Dutch",
            nativeName: "Nederlands",
            googleAbbr: "nl"
        }, {
            name: "Estonian",
            nativeName: "Eesti",
            googleAbbr: "et"
        }, {
            name: "Finnish",
            nativeName: "Suomen kieli",
            googleAbbr: "fi"
        }, {
            name: "Greek",
            nativeName: "ελληνικά",
            googleAbbr: "el"
        }, {
            name: "Gujarati",
            nativeName: "ગુજરાતી",
            googleAbbr: "gu"
        }, {
            name: "Hebrew",
            nativeName: "עברית‬",
            googleAbbr: "iw"
        }, {
            name: "Hmong",
            nativeName: "Lus Hmoob",
            googleAbbr: "hmn"
        }, {
            name: "Hungarian",
            nativeName: "Magyar",
            googleAbbr: "hu"
        }, {
            name: "Indonesian",
            nativeName: "Bahasa Indonesia",
            googleAbbr: "id"
        }, {
            name: "Javanese",
            nativeName: "Wong Jawa",
            googleAbbr: "jw"
        }, {
            name: "Kazakh",
            nativeName: "Қазақ тілі",
            googleAbbr: "kk"
        }, {
            name: "Kurdish",
            nativeName: "Kurdî",
            googleAbbr: "ku"
        }, {
            name: "Lao",
            nativeName: "ພາສາລາວ",
            googleAbbr: "lo"
        }, {
            name: "Latvian",
            nativeName: "Latviešu",
            googleAbbr: "lv"
        }, {
            name: "Lithuanian",
            nativeName: "Lietuvių",
            googleAbbr: "lt"
        }, {
            name: "Malayalam",
            nativeName: "മലയാളം",
            googleAbbr: "ml"
        }, {
            name: "Maori",
            nativeName: "Māori",
            googleAbbr: "mi"
        }, {
            name: "Marathi",
            nativeName: "मराठी",
            googleAbbr: "mr"
        }, {
            name: "Nepali",
            nativeName: "नेपाली",
            googleAbbr: "ne"
        }, {
            name: "Norwegian",
            nativeName: "Norsk",
            googleAbbr: "no"
        }, {
            name: "Pashto",
            nativeName: "پښتو",
            googleAbbr: "ps"
        }, {
            name: "Persian/Farsi",
            nativeName: "فارسی",
            googleAbbr: "fa"
        }, {
            name: "Punjabi",
            nativeName: "ਪੰਜਾਬੀ",
            googleAbbr: "pa"
        }, {
            name: "Romanian",
            nativeName: "Română",
            googleAbbr: "ro"
        }, {
            name: "Samoan",
            nativeName: "Sāmoa",
            googleAbbr: "sm"
        }, {
            name: "Serbian",
            nativeName: "српски",
            googleAbbr: "sr"
        }, {
            name: "Shona",
            nativeName: "ChiShona",
            googleAbbr: "sn"
        }, {
            name: "Sinhala",
            nativeName: "සිංහල",
            googleAbbr: "si"
        }, {
            name: "Slovak",
            nativeName: "Slovenčina",
            googleAbbr: "sk"
        }, {
            name: "Slovenian",
            nativeName: "Slovenščina",
            googleAbbr: "sl"
        }, {
            name: "Swahili",
            nativeName: "Kiswahili",
            googleAbbr: "sw"
        }, {
            name: "Swedish",
            nativeName: "Svenska",
            googleAbbr: "sv"
        }, {
            name: "Tamil",
            nativeName: "தமிழ்",
            googleAbbr: "ta"
        }, {
            name: "Telugu",
            nativeName: "తెలుగు",
            googleAbbr: "te"
        }, {
            name: "Turkish",
            nativeName: "Türkçe",
            googleAbbr: "tr"
        }, {
            name: "Ukrainian",
            nativeName: "Українська",
            googleAbbr: "uk"
        }, {
            name: "Urdu",
            nativeName: "اُردُو‬",
            googleAbbr: "ur"
        }, {
            name: "Yoruba",
            nativeName: "Yorùbá",
            googleAbbr: "yo"
        }], c = [], e = [], o, r, s, h, a;
        for (o in n)
            n[o].sortable == undefined ? c.push(n[o]) : e.push(n[o]);
        c.sort(function(n, t) {
            var i = n.name.toLowerCase()
              , r = t.name.toLowerCase();
            return i == r ? 0 : i < r ? -1 : 1
        });
        e.push.apply(e, c);
        n = e;
        var i = this
          , t = []
          , f = [];
        this.showLanguages = ko.observable(!1);
        r = function(n, t, i, r) {
            if (n == null || t == null || i <= 0)
                return -1;
            if (t.length == 0)
                return r ? n.length : 0;
            var f = 0
              , u = r ? n.length : -1;
            do {
                if (u = r ? n.lastIndexOf(t, u - 1) : n.indexOf(t, u + 1),
                u < 0)
                    return u;
                f++
            } while (f < i);
            return u
        }
        ;
        s = function() {
            var t = 1, i = "", n;
            n = window.document.getElementById("stageFrame").contentWindow.document.getElementById("iFramePreview") ? $(window.document.getElementById("stageFrame").contentWindow.document.getElementById("iFramePreview").contentWindow.document) : $(window.document.getElementById("stageFrame").contentWindow.document);
            n.find("svg")[0] && (n.find("svg")[0].find("text.dragButtonLabel.unselectable").attr("no-translate", "true"),
            n.find("svg")[0].find("text.tubeLabel.unselectable").attr("no-translate", "true"),
            n.find("svg")[0].find("text.testTubesInstructionLabel.unselectable").html(function(n, u) {
                var e = t == 1 ? u.substring(u.lastIndexOf("<span"), u.lastIndexOf("<\/span") + 7) : "", o = r(u, "<span", 3, !1), f;
                return o > -1 && (e = u.substring(r(u, "<span", 3, !1), r(u, "<\/span", 2, !1) + 7)),
                f = e.substring(r(e, ">", 1, !1) + 1, r(e, "<\/span>", 1, !1)),
                t === 1 ? (i = f,
                f.length > 65 && (f = f.substring(0, f.indexOf(" ", 65))),
                t = 2) : (i.length > 65 && (f = i.substring(i.indexOf(" ", 65))),
                t = 1),
                f === e ? f : f + e
            }),
            n.find("svg")[0].find("text:not(.testTubesInstructionLabel)").html(function(n, t) {
                var i = t, u;
                return t.lastIndexOf("<span") > -1 && (i = t.substring(t.lastIndexOf("<span"), t.lastIndexOf("<\/span") + 7)),
                u = i,
                r(i, ">", 1, !1) > -1 && (u = i.substring(r(i, ">", 1, !1) + 1, r(i, "<\/span>", 1, !1))),
                u === i ? u : u + i
            }))
        }
        ;
        this.AddWindow = function(n) {
            if (n) {
                for (var i = 0; i < t.length; i++)
                    if (t[i] === n)
                        return;
                t.push(n)
            }
        }
        ;
        this.translateCallback = function() {}
        ;
        h = function(r, u) {
            for (var e = 0; e < t.length; e++)
                f[t[e]] ? n[i.currentLanguageIndex()].googleAbbr !== n[r].googleAbbr ? f[t[e]].translatePage(n[i.currentLanguageIndex()].googleAbbr, n[r].googleAbbr, u) : f[t[e]].translatePage(n[0].googleAbbr, n[r].googleAbbr, u) : f[t[e]] = new t[e].gh.ultraLight.translation(function() {
                    h(r, u)
                }
                )
        }
        ;
        a = function(n) {
            for (var i = 0; i < t.length; i++)
                f[t[i]].revertPage(n)
        }
        ;
        this.moreActive = ko.observable(!1);
        this.currentLanguageIndex = function() {
            var t = ko.observable(0);
            return ko.computed({
                read: function() {
                    return t()
                },
                write: function(r) {
                    if (typeof r == "string")
                        for (var u = 0; u < n.length; u++)
                            if (n[u].googleAbbr == r) {
                                r = u;
                                break
                            }
                    try {
                        r != 0 ? t() != 0 ? a(function() {
                            h(r, function() {
                                t(r);
                                console.log("Finished Translating");
                                s();
                                l()
                            })
                        }) : h(r, function() {
                            t(r);
                            console.log("Finished Translating");
                            s();
                            l()
                        }) : a(function() {
                            t(r);
                            console.log("Finished Reverting");
                            s();
                            l()
                        })
                    } catch (f) {
                        console.log("Error in translation")
                    }
                    i.translateCallback()
                }
            })
        }();
        this.currentLanguage = ko.computed(function() {
            return n[i.currentLanguageIndex()]
        });
        this.currentDisplay = ko.computed(function() {
            var t = n.slice(0, i.currentLanguageIndex()).concat(n.slice(i.currentLanguageIndex() + 1, n.length));
            return i.moreActive() ? t : t.slice(0, i.currentLanguageIndex() > 5 ? 5 : 6)
        });
        this.enabled = ko.observable(!1);
        this.enable = function(n) {
            !n || ($.ajaxSetup({
                cache: !0
            }),
            $.getScript(n, function() {
                $.ajaxSetup({
                    cache: !1
                });
                i.enabled(!0);
                i.AddWindow(window)
            }))
        }
    }, {
        toggleMore: function() {
            this.moreActive(!this.moreActive());
            this.showLanguages(!1);
            Actions.Log()
        },
        setLanguage: function(n, t) {
            Actions.Log();
            n = ko.utils.unwrapObservable(n);
            this.translateCallback = t && typeof t == "function" ? t : function() {}
            ;
            this.currentLanguageIndex(n);
            this.moreActive(!1)
        },
        toggleLanguages: function() {
            Actions.Log();
            this.Translator().showLanguages(!this.Translator().showLanguages())
        }
    })
});
Namespace.classdef("edgenuity.model.player.PlayerViewModel", function(n) {
    Namespace.using("edgenuity.model.glossary");
    Namespace.using("edgenuity.model.lessonpane");
    Namespace.using("edgenuity.model.player");
    Namespace.using("edgenuity.model.translation.TranslatorViewModel");
    var t = Namespace.using("edgenuity.utility.AudioPlayer")
      , l = edgenuity.model.glossary.GlossaryModel
      , r = edgenuity.model.lessonpane.LessonPaneViewModel
      , a = edgenuity.model.player.LocalizationModel
      , u = edgenuity.model.player.ToolbarModel
      , f = edgenuity.model.translation.TranslatorViewModel
      , e = edgenuity.model.player.GradeBarModel
      , v = edgenuity.model.player.UIToolbarModel
      , o = edgenuity.model.player.UserModel
      , s = edgenuity.model.player.StageViewModel
      , h = edgenuity.model.player.StudentSupportModel
      , c = edgenuity.model.player.TimeoutModel
      , i = function(n) {
        return n = n.split(/\D/),
        new Date(Date.UTC(n[0], --n[1] || "", n[2] || "", n[3] || "", n[4] || "", n[5] || "", n[6] || ""))
    };
    n(function(n, l, a) {
        var v = this, k, w, d, y, g, it, nt;
        this.NextObjectType = "";
        this.user = ko.observable(new o);
        this.gradebar = ko.observable(new e(l.teacherComment,l.score,l.gradeBarInfo));
        this.nextReloadURL = "";
        this.prevReloadURL = "";
        this.stageView = ko.observable(new s(a));
        this.title = this.stageView().CourseName;
        this.studentSupport = ko.observable(new h);
        this.lessonPaneView = ko.observable(new r(l.note,l.glossary,l.transcript,l.assessmentService,l.proxy));
        this.Impersonation = ko.observable(n.InitialLaunchData.Impersonation);
        this.ImpersonationURL = ko.observable(n.InitialLaunchData.ImpersonationURL);
        this.logoutURL = ko.observable(n.InitialLaunchData.LogoutURL);
        this.toolbar = ko.observable(new u(new t,l.readAloud,l.tools));
        this.toolbar().showAudio(n.InitialLaunchData.ReadAloudEnabled);
        this.timeout = new c;
        this.Translator = ko.observable(new f);
        !n.InitialLaunchData.TranslateEnabled || this.Translator().enable(n.InitialLaunchData.TranslateLocation);
        this.ReturnURL = ko.observable(n.InitialLaunchData.ReturnURL);
        this.stageView().populate(n.InitialActivityData);
        this.stageView().CourseName(n.InitialLaunchData.CourseName);
        this.stageView().ContextID(n.InitialLaunchData.ContextID);
        this.stageView().LMSCourseID(n.InitialLaunchData.LMSCourseID);
        this.user().populate(n.InitialLaunchData);
        this.audioPlayer = new t;
        this.audioPlayer2 = new t;
        iFrameNotify.listen("playAudio", function(n) {
            n.postponeCallback = !0;
            n.data.player && n.data.player == "alternate" ? v.audioPlayer2.activate(n.data.file, function() {
                iFrameNotify.sendCallback("stageFrame", n.callback, {
                    played: !0
                })
            }) : v.audioPlayer.activate(n.data.file, function() {
                iFrameNotify.sendCallback("stageFrame", n.callback, {
                    played: !0
                })
            })
        });
        var b = new Date
          , tt = b
          , p = "";
        this.updateSession = function() {
            l.sessionHandler && iFN.notify({
                frame: document.getElementById("stageFrame"),
                message: "getLastAction",
                callback: function(t) {
                    var r = Actions.GetLastAction(), u;
                    !!t && !!t.LastAction && (t.LastAction instanceof Date ? t.LastAction : typeof t.LastAction == "string" ? t.LastAction = i(t.LastAction) : null) > r && (r = t.LastAction);
                    r > tt && (u = v.stageView().ActivityStatus() == "Complete" || n.InitialActivityData.ActivityStatus == "Complete",
                    l.sessionHandler.Post("?SessionID=" + n.InitialLaunchData.SessionID + "&lastAction=" + r.getTime() + "&loaded=" + b.getTime() + p + "&completed=" + u.toString(), {}, {
                        success: function(n) {
                            n && !n.SessionActive && v.goHomeNoSave()
                        },
                        error: function() {}
                    }),
                    tt = r)
                }
            })
        }
        ;
        l.sessionHandler && (window.onunload = function() {
            if (!k && (new Date).getTime() - b.getTime() < 12e4)
                var t = v.stageView().ActivityStatus() == "Complete" || n.InitialActivityData.ActivityStatus == "Complete";
            l.sessionHandler.Post("?SessionID=" + n.InitialLaunchData.SessionID + p + "&completed=" + t.toString(), {}, {
                async: !1
            })
        }
        );
        k = !1;
        this.sessionRefreshTimeoutID = null;
        l.sessionHandler && (v.sessionRefreshTimeoutID = setInterval(function() {
            v.updateSession();
            k = !0
        }, n.InitialLaunchData.SessionCallbackTimeout));
        n.InitialActivityData.ActivityStatus == "Complete" && this.gradebar().get(n.InitialLaunchData.ResultID);
        n.InitialLaunchData.LivePersonEnabled && n.InitialLaunchData.SelectedStudentChatType == "LivePerson" && (this.studentSupport().populate(),
        this.studentSupport().lpAddMonitorTag(this));
        w = function(n) {
            return n.NextActivity && n.NextActivity.ActivityOrder != "00000000-0000-0000-0000-000000000000" && n.ActivityStatus == "Complete" && !n.NavigationLocked
        }
        ;
        d = function(n) {
            return n.PrevActivity && n.PrevActivity.ActivityOrder != "00000000-0000-0000-0000-000000000000" && !n.NavigationLocked
        }
        ;
        this.overrideCallback = null;
        this.overrideExitCallback = null;
        y = function(n) {
            v.overrideCallback = n;
            v.overrideExitCallback = null;
            iFrameNotify.notify({
                frame: a,
                message: "exit",
                callback: n
            })
        }
        ;
        this.goHomeNoSave = function() {
            var n = ko.utils.unwrapObservable(v.ReturnURL);
            window.location = n
        }
        ;
        this.goHome = function() {
            v.lessonPaneView().saveNotes();
            window.onbeforeunload = null;
            y(function() {
                var n = ko.utils.unwrapObservable(v.ReturnURL);
                window.location = n;
                v.overrideExitCallback = null;
                v.overrideCallback = null
            })
        }
        ;
        this.logout = function() {
            var n = !1
              , t = function() {
                n || (n = !0,
                window.onbeforeunload = null,
                window.location = v.logoutURL() || v.ReturnURL(),
                v.overrideExitCallback = null,
                v.overrideCallback = null)
            };
            v.lessonPaneView().saveNotes(t);
            setTimeout(t, 3e3)
        }
        ;
        this.logoutSave = function() {
            var n = !1
              , t = function() {
                n || (n = !0,
                window.onbeforeunload = null,
                y(function() {
                    window.location = v.logoutURL() || v.ReturnURL();
                    v.overrideExitCallback = null;
                    v.overrideCallback = null
                }))
            };
            v.lessonPaneView().saveNotes(t);
            setTimeout(t, 3e3)
        }
        ;
        this.unimpersonate = function() {
            $.ajax({
                type: "POST",
                url: this.ImpersonationURL(),
                async: !1,
                dataType: "json",
                data: null,
                success: function(n) {
                    if (n.success) {
                        var t = !1
                          , i = function() {
                            t || (t = !0,
                            window.onbeforeunload = null,
                            y(function() {
                                window.location = n.message;
                                v.overrideExitCallback = null;
                                v.overrideCallback = null
                            }))
                        };
                        v.lessonPaneView().saveNotes(i);
                        setTimeout(i, 3e3)
                    }
                }
            })
        }
        ;
        this.getEndActivityInfo = function(t) {
            var i = !1;
            v.lessonPaneView().saveNotes();
            t == n.InitialLaunchData.ResultID ? v.Translator().setLanguage(0, function() {
                l.endactivity ? l.endactivity.Get("", {
                    CurrentAttemptID: n.InitialLaunchData.ResultID
                }, {
                    success: function(t) {
                        v.overrideExitCallback && v.overrideCallback ? v.overrideCallback() : (t.EndActivity.Status == 0 ? v.stageView().ActivityStatus("Complete") : t.EndActivity.Status == 1 && v.stageView().ActivityStatus("Active"),
                        v.stageView().nextEnabled(t.EndActivity.EnableNextActivity),
                        t.EndActivity.Action == "GOHOME" ? window.location = v.ReturnURL() : t.EndActivity.Action == "RELAUNCH" ? v.stageView().loadUrl(Namespace.global().services.main.basepath) : t.EndActivity.Action == "OVERLAY" ? v.stageView().loadUrl(Namespace.global().services.overlay.basepath + "?IsResponse=true") : t.EndActivity.Action == "BYPASS" && (v.stageView().ActivityStatus("Bypassed"),
                        v.stageView().loadUrl("home/bypass")),
                        t.EndActivity.Status == 0 && t.EndActivity.Action != "OVERLAY" ? v.gradebar().get(n.InitialLaunchData.ResultID) : v.gradebar().Visible(!1));
                        v.updateSession()
                    }
                }) : i = !0
            }) : i = !0;
            i && (v.updateSession(),
            window.location = v.ReturnURL())
        }
        ;
        this.callingStartActivity = !1;
        this.startActivity = function(t, i) {
            l.startActivity ? v.callingStartActivity || (v.callingStartActivity = !0,
            l.startActivity.Get("", {
                UserID: n.InitialLaunchData.UserID,
                ContextID: n.InitialLaunchData.ContextID,
                ActivityOrder: t,
                IsSSLimited: n.InitialLaunchData.IsSSLimited,
                AllowPretestsAndQuizzes: n.InitialLaunchData.AllowPretestsAndQuizzes,
                SessionLogID: n.InitialLaunchData.SessionID
            }, {
                success: function(t) {
                    if (t.Navigation.Warning)
                        i && typeof i == "function" && i(t.Navigation.Warning),
                        v.callingStartActivity = !1;
                    else {
                        v.NextObjectType && v.NextObjectType.indexOf("A") === 0 && document.getElementById("aEnotes").click();
                        n.InitialLaunchData.ResultID = t.Navigation.AttemptID;
                        n.InitialLaunchData.ResourceLinkID = t.Navigation.ResourceLinkID;
                        n.InitialActivityData.ActivityStatus = t.Navigation.ActivityStatus;
                        n.InitialActivityData.NavigationLocked = t.Navigation.NavigationLocked;
                        n.InitialLaunchData.ObjectType = t.Navigation.ObjectType;
                        p = t.Navigation.Hash ? "&gradeID=" + t.Navigation.AttemptID + "&hash=" + t.Navigation.Hash : "";
                        v.stageView().ObjectType(n.InitialLaunchData.ObjectType);
                        v.stageView().nextEnabled(w(n.InitialActivityData));
                        v.stageView().prevEnabled(d(n.InitialActivityData));
                        v.stageView().ActivityStatus(n.InitialActivityData.ActivityStatus);
                        v.toolbar().get(n.InitialLaunchData.ResultID);
                        v.Translator().setLanguage(0, function() {
                            v.stageView().loadUrl(Namespace.global().services.main.basepath)
                        });
                        v.gradebar().clear();
                        v.gradebar().get(n.InitialLaunchData.ResultID);
                        v.lessonPaneView().permission(!0);
                        v.lessonPaneView().lazyLoad(function() {
                            v.lessonPaneView().getLessonList(n.InitialLaunchData.ResultID, n.InitialActivityData.NotesID);
                            v.lessonPaneView().glossaryView().get(n.InitialActivityData.GlossaryID);
                            v.lessonPaneView().transcriptView().gettranscripts(n.InitialActivityData.TranscriptID)
                        });
                        v.callingStartActivity = !1;
                        var r = v.stageView().isNova();
                        v.lessonPaneView().noteView().hideGlossaryAndTranscript(r);
                        v.toolbar().showHighlights(!r);
                        r && window.addEventListener("beforeunload", ()=>{
                            stageFrame.postMessage("save", v.stageView().getOrigin())
                        }
                        )
                    }
                },
                error: function() {
                    v.callingStartActivity = !1
                }
            })) : (v.toolbar().get(n.InitialActivityData.ToolsID),
            v.stageView().loadUrl(Namespace.global().services.main.basepath),
            v.lessonPaneView().getLessonList(n.InitialLaunchData.ResultID),
            v.lessonPaneView().lazyLoad(function() {
                v.lessonPaneView().glossaryView().get(n.InitialActivityData.GlossaryID);
                v.lessonPaneView().getNotes(n.InitialActivityData.NotesID);
                v.lessonPaneView().transcriptView().gettranscripts(n.InitialActivityData.TranscriptID)
            }))
        }
        ;
        this.startOverlay = function() {
            l.currentActivity && l.currentActivity.Get("", {
                UserID: n.InitialLaunchData.UserID,
                StudentBuildID: n.InitialLaunchData.ContextID,
                ActivityOrder: n.InitialActivityData.ActivityOrder,
                IsSSLimited: n.InitialLaunchData.IsSSLimited,
                AllowPretestsAndQuizzes: n.InitialLaunchData.AllowPretestsAndQuizzes
            }, {
                success: function(t) {
                    n.InitialLaunchData.LearningObjectKey = t.Navigation.LearningObjectKey;
                    n.InitialActivityData.NextActivity.ActivityOrder = t.Navigation.NextActivity.ActivityOrder;
                    n.InitialActivityData.GlossaryID = t.Navigation.GlossaryID;
                    n.InitialActivityData.NotesID = n.InitialLaunchData.ConsumerKey + "_" + t.Navigation.NotesID + "_" + n.InitialLaunchData.ContextID;
                    n.InitialActivityData.TranscriptID = t.Navigation.TranscriptID;
                    n.InitialActivityData.ActivityOrder = t.Navigation.ActivityOrder;
                    n.InitialActivityData.NavigationLocked = t.Navigation.NavigationLocked;
                    n.InitialActivityData.ActivityStatus = t.Navigation.ActivityStatus;
                    v.stageView().Title(t.Navigation.LessonName);
                    v.stageView().ActivityName(t.Navigation.ActivityName);
                    v.stageView().prevEnabled(d(t.Navigation));
                    v.stageView().nextEnabled(w(t.Navigation));
                    v.stageView().ObjectType(t.Navigation.ObjectType);
                    n.InitialActivityData.ActivityStatus == "Active" && (n.InitialActivityData.ActivityStatus = "Not Started");
                    v.stageView().ActivityStatus(n.InitialActivityData.ActivityStatus);
                    v.gradebar().Visible(!1);
                    v.stageView().loadUrl(l.overlay.basepath)
                }
            })
        }
        ;
        this.callingloadActivityAttempt = !1;
        this.loadActivityAttempt = function(t) {
            if (v.NextObjectType && v.NextObjectType.indexOf("A") === 0 && document.getElementById("aEnotes").click(),
            l.loadActivityAttempt) {
                if (v.callingloadActivityAttempt)
                    return;
                v.callingloadActivityAttempt = !0;
                l.loadActivityAttempt.Get("", {
                    AttemptID: t
                }, {
                    success: function(t) {
                        n.InitialLaunchData.ResultID = t.Navigation.AttemptID;
                        n.InitialLaunchData.LearningObjectKey = t.Navigation.LearningObjectKey;
                        n.InitialLaunchData.ResourceLinkID = t.Navigation.ResourceLinkID;
                        n.InitialActivityData.ActivityStatus = t.Navigation.ActivityStatus;
                        n.InitialActivityData.NavigationLocked = t.Navigation.NavigationLocked;
                        v.stageView().nextEnabled(w(n.InitialActivityData));
                        v.stageView().ActivityStatus(n.InitialActivityData.ActivityStatus);
                        v.toolbar().get(n.InitialLaunchData.ResultID);
                        v.Translator().setLanguage(0, function() {
                            v.stageView().loadUrl(Namespace.global().services.main.basepath)
                        });
                        n.InitialActivityData.ActivityStatus == "Complete" ? v.gradebar().get(n.InitialLaunchData.ResultID) : v.gradebar().Visible(!1);
                        v.lessonPaneView().getLessonList(n.InitialLaunchData.ResultID);
                        v.lessonPaneView().lazyLoad(function() {
                            v.lessonPaneView().glossaryView().get(n.InitialActivityData.GlossaryID);
                            v.lessonPaneView().getNotes(n.InitialActivityData.NotesID);
                            v.lessonPaneView().transcriptView().gettranscripts(n.InitialActivityData.TranscriptID)
                        })
                    },
                    async: !1,
                    error: function() {
                        v.callingloadActivityAttempt = !1
                    }
                })
            }
        }
        ;
        g = function(t) {
            var r, i, u;
            t.Navigation.ShowOverlay ? (n.InitialActivityData.ActivityOrder = t.Navigation.ActivityOrder,
            v.startOverlay()) : (n.InitialLaunchData.LearningObjectKey = t.Navigation.LearningObjectKey,
            n.InitialActivityData.NextActivity.ActivityOrder = t.Navigation.NextActivity.ActivityOrder,
            n.InitialActivityData.GlossaryID = t.Navigation.GlossaryID,
            n.InitialActivityData.NotesID = n.InitialLaunchData.ConsumerKey + "_" + t.Navigation.NotesID + "_" + n.InitialLaunchData.ContextID,
            n.InitialActivityData.TranscriptID = t.Navigation.TranscriptID,
            n.InitialActivityData.ActivityOrder = t.Navigation.ActivityOrder,
            n.InitialActivityData.NavigationLocked = t.Navigation.NavigationLocked,
            v.stageView().Title(t.Navigation.LessonName),
            v.stageView().ActivityName(t.Navigation.ActivityName),
            v.startActivity(t.Navigation.ActivityOrder));
            r = n.InitialLaunchData.ReturnURL.toLocaleLowerCase();
            r.indexOf("/homeroom/lobby.aspx") > 0 ? (r = r.replace("/homeroom/lobby.aspx", "/activities/coursemap.aspx"),
            v.ReturnURL(r.substring(0, r.indexOf("?")) + "?returnOrder=" + t.Navigation.ActivityOrder)) : (i = n.InitialLaunchData.ReturnURL,
            u = i.match(/[?&]returnOrder=[^&]+/),
            i = u ? i.replace(/([?&])returnOrder=([^&]+)/, "$1returnOrder=" + t.Navigation.ActivityOrder) : i.indexOf("?") > 0 ? i + "&returnOrder=" + t.Navigation.ActivityOrder : i + "?returnOrder=" + t.Navigation.ActivityOrder,
            v.ReturnURL(i));
            v.overrideExitCallback = null;
            v.overrideCallback = null
        }
        ;
        iFrameNotify.listen("nextactivity", function() {
            v.getNextActivity()
        });
        this.getNextActivity = function(t) {
            v.lessonPaneView().saveNotes();
            v.stageView().nextEnabled() && l.relaunch ? window.location = l.relaunch.basepath + (l.relaunch.basepath.match(/\?/) ? "&" : "?") + "Action=Next" : v.stageView().nextEnabled() && l.navigation && l.navigation.Get("", {
                UserID: n.InitialLaunchData.UserID,
                StudentBuildID: n.InitialLaunchData.ContextID,
                ActivityOrder: n.InitialActivityData.ActivityOrder,
                IsSSLimited: n.InitialLaunchData.IsSSLimited,
                AllowPretestsAndQuizzes: n.InitialLaunchData.AllowPretestsAndQuizzes
            }, {
                success: function(n) {
                    if (v.NextObjectType = n.Navigation.ObjectType,
                    !t) {
                        if (n.Navigation.Warning && n.Navigation.Warning.length > 0)
                            return;
                        y(function() {
                            g(n)
                        });
                        v.validateActivityForChat(n.Navigation.IsRestrictedActivity)
                    }
                }
            })
        }
        ;
        this.getPreviousActivity = function() {
            window.onbeforeunload = null;
            v.lessonPaneView().saveNotes();
            v.stageView().prevEnabled() && l.relaunch ? window.location = l.relaunch.basepath + (l.relaunch.basepath.match(/\?/) ? "&" : "?") + "Action=Prev" : v.stageView().prevEnabled() && l.prevActivity && l.prevActivity.Get("", {
                UserID: n.InitialLaunchData.UserID,
                StudentBuildID: n.InitialLaunchData.ContextID,
                ActivityOrder: n.InitialActivityData.ActivityOrder,
                IsSSLimited: n.InitialLaunchData.IsSSLimited,
                AllowPretestsAndQuizzes: n.InitialLaunchData.AllowPretestsAndQuizzes
            }, {
                success: function(n) {
                    n.Navigation.Warning && n.Navigation.Warning.length > 0 || (y(function() {
                        g(n)
                    }),
                    v.validateActivityForChat(n.Navigation.IsRestrictedActivity))
                }
            })
        }
        ;
        this.validateActivityForChat = function(t=n.InitialLaunchData.IsRestrictedActivity) {
            typeof zE == "function" && (t ? hideZenDeskChat() : showZenDeskChat())
        }
        ;
        this.startMobile = function() {
            v.lessonPaneView().mobile(!0)
        }
        ;
        this.startDesktop = function() {
            v.lessonPaneView().mobile(!1)
        }
        ;
        this.showSettings = function(n) {
            n ? $(".settings-button").addClass("settings-button-show") : $(".settings-button").removeClass("settings-button-show")
        }
        ;
        it = {
            baseNoSammy: function() {
                n.InitialActivityData.ShowOverlay ? v.startOverlay() : v.startActivity(n.InitialActivityData.ActivityOrder)
            },
            base: function() {},
            activity: function() {}
        };
        it.baseNoSammy();
        nt = !0;
        iFrameNotify.listen("noinactive", function() {
            nt = !1
        });
        iFrameNotify.listen("inactiveMovement", function() {
            v.moveStageFrame = !0
        });
        v.moveStageFrame = !1;
        Actions.SetTimeout(function() {
            if (nt) {
                var t = ko.utils.unwrapObservable(v.logoutURL);
                t && iFrameNotify.notify({
                    frame: document.getElementById("stageFrame"),
                    message: "getLastAction",
                    callback: function(t) {
                        !!t && !!t.LastAction && (t.LastAction instanceof Date ? t.LastAction : typeof t.LastAction == "string" ? t.LastAction = i(t.LastAction) : null) > Actions.GetLastAction() && Actions.Log(null, t.LastAction);
                        var r = Actions.GetTotalTime();
                        r > Actions.GetTimeout() ? r < Actions.GetTimeout() + n.InitialLaunchData.InactivityCountdown ? (v.moveStageFrame && (document.getElementById("stageFrame").style.visibility = "hidden"),
                        v.timeout.start(n.InitialLaunchData.InactivityCountdown, function() {
                            v.logout();
                            v.timeout.stop()
                        }, function() {
                            Actions.Log();
                            v.timeout.stop();
                            Actions.ResetTimeout();
                            document.getElementById("stageFrame").style.visibility = ""
                        })) : (v.logout(),
                        v.timeout.stop()) : (Actions.ResetTimeout(),
                        document.getElementById("stageFrame").style.visibility = "")
                    }
                })
            }
        }, n.InitialLaunchData.InactivityTimeout)
    }, {})
});
ko.bindingHandlers.realEnable = {
    update: function(n, t) {
        ko.utils.unwrapObservable(t()) ? $(n).removeClass("disabled") : $(n).addClass("disabled")
    }
};
ko.bindingHandlers.toggleClass = {
    init: function(n, t) {
        $(n).click(function() {
            $(n).toggleClass(t())
        })
    }
};
ko.bindingHandlers.pageTitle = {
    init: function(n, t) {
        var i = t()(), r;
        i || (i = $(n).data("title-default") ? $(n).data("title-default") : "");
        r = $(n).data("title") ? $(n).data("title") : "";
        document.title = i + r
    },
    update: function(n, t) {
        var i = t()(), r;
        i || (i = $(n).data("title-default") ? $(n).data("title-default") : "");
        r = $(n).data("title") ? $(n).data("title") : "";
        document.title = i + r
    }
};
ko.bindingHandlers.enterKey = {
    init: function(n, t, i, r) {
        var u = ko.utils.unwrapObservable(t());
        $(n).keyup(function(n) {
            n.which === 13 && u.apply(r)
        })
    }
},
function() {
    var n = function(t, i, r) {
        var u = ko.utils.unwrapObservable(i), f, e;
        if (typeof u.style != "undefined" && typeof u.value != "undefined")
            style = ko.utils.unwrapObservable(u.style),
            i = ko.utils.unwrapObservable(u.value),
            f = {},
            f[style] = u,
            $(t).animate(f, {
                duration: 100,
                queue: !1
            });
        else if (r)
            f = {},
            f[r] = u,
            $(t).animate(f, {
                duration: 100,
                queue: !1
            });
        else
            for (e in u)
                n(t, u[e], e)
    };
    ko.bindingHandlers.animatedStyle = {
        init: function(t, i) {
            n(t, i())
        },
        update: function(t, i) {
            n(t, i())
        }
    }
}();
$(function() {
    Namespace.compile(function() {
        var i, t, n, r;
        initialization.InitialLaunchData.touchEnabled = Modernizr.touch;
        i = Namespace.global();
        Modernizr.audio.mp3 || FlashDetect.installed || alert("MP3 Support is not detected.  Please install Adobe Flash.");
        Array.prototype.indexOf || (Array.prototype.indexOf = function(n) {
            var i = this.length >>> 0
              , t = Number(arguments[1]) || 0;
            for (t = t < 0 ? Math.ceil(t) : Math.floor(t),
            t < 0 && (t += i); t < i; t++)
                if (t in this && this[t] === n)
                    return t;
            return -1
        }
        );
        t = edgenuity.service.Service;
        i.services = {};
        n = i.services;
        initialization.Services && (initialization.Services.Main && (n.main = new t(initialization.Services.Main.Location),
        n.main.init()),
        initialization.Services.Overlay && (n.overlay = new t(initialization.Services.Overlay.Location),
        n.overlay.init()),
        initialization.Services.Note && (n.note = new t(initialization.Services.Note.Location),
        n.note.init()),
        initialization.Services.Glossary && (n.glossary = new t(initialization.Services.Glossary.Location),
        n.glossary.init()),
        initialization.Services.Transcript && (n.transcript = new t(initialization.Services.Transcript.Location),
        n.transcript.init()),
        initialization.Services.Activity && (n.navigation = new t(initialization.Services.Activity.Location),
        n.navigation.init()),
        initialization.Services.CurrentActivity && (n.currentActivity = new t(initialization.Services.CurrentActivity.Location),
        n.currentActivity.init()),
        initialization.Services.StartActivity && (n.startActivity = new t(initialization.Services.StartActivity.Location),
        n.startActivity.init()),
        initialization.Services.LoadActivityAttempt && (n.loadActivityAttempt = new t(initialization.Services.LoadActivityAttempt.Location),
        n.loadActivityAttempt.init()),
        initialization.Services.EndActivity && (n.endactivity = new t(initialization.Services.EndActivity.Location),
        n.endactivity.init()),
        initialization.Services.PrevActivity && (n.prevActivity = new t(initialization.Services.PrevActivity.Location),
        n.prevActivity.init()),
        initialization.Services.Tools && (n.tools = new t(initialization.Services.Tools.Location),
        n.tools.init()),
        initialization.Services.GradeBarInfo && (n.gradeBarInfo = new t(initialization.Services.GradeBarInfo.Location),
        n.gradeBarInfo.init()),
        initialization.Services.SessionHandler && (n.sessionHandler = new t(initialization.Services.SessionHandler.Location),
        n.sessionHandler.init()),
        initialization.Services.AssessmentLessonList && (n.assessmentService = new t(initialization.Services.AssessmentLessonList.Location),
        n.assessmentService.init()),
        initialization.Services.ReadAloud && (n.readAloud = new t(initialization.Services.ReadAloud.Location),
        n.readAloud.init()),
        initialization.Services.teacherComment && (n.teacherComment = new t(initialization.Services.teacherComment.Location),
        n.teacherComment.init()),
        initialization.Services.score && (n.score = new t(initialization.Services.score.Location),
        n.score.init()),
        initialization.Services.proxy && (n.proxy = new t(initialization.Services.proxy.Location),
        n.proxy.init()),
        initialization.Services.relaunch && (n.relaunch = new t(initialization.Services.relaunch.Location),
        n.relaunch.init()));
        i.playerView = new edgenuity.model.player.PlayerViewModel(initialization,n,$("#stageFrame")[0].contentWindow);
        i.noteView = new edgenuity.model.note.NoteViewModel(initialization,n,$("#stageFrame")[0].contentWindow);
        ko.applyBindings(i.playerView);
        iFrameNotify.listen("setOptions", function(n) {
            n.data && (n.data.overrideExitCallback && (i.playerView.overrideExitCallback = !0),
            n.data.clearOverrideExitCallback && (i.playerView.overrideExitCallback = !1,
            i.playerView.overrideCallback = null),
            n.data.useReturnURL && (i.playerView.overrideCallback = i.playerView.goHomeNoSave),
            n.data.width && i.playerView.stageView().width(n.data.width + "px"))
        });
        iFrameNotify.listen("load", function(n) {
            n || (n = {});
            n.data || (n.data = {});
            console.log("loading");
            i.playerView.stageView().TryStartStageFrameInterval(n.data.width || null);
            i.playerView.callingStartActivity = !1;
            i.playerView.callingloadActivityAttempt = !1;
            i.playerView.moveStageFrame = !1
        });
        i.tabs = function(n, t) {
            function c() {
                r(0);
                e.startMobile()
            }
            function l() {
                r() == 0 && r(1);
                e.startDesktop()
            }
            var u = $(n)
              , o = $("body")
              , s = $(window)
              , h = $("#activityPane")
              , e = i.playerView
              , r = ko.observable();
            r.subscribe(function(n) {
                u.tabs({
                    active: n
                })
            });
            e.lessonPaneView().permission.subscribe(function(n) {
                i.playerView.lessonPaneView().mobile() && (n || r(0))
            });
            var f = $(window).width()
              , a = f > t
              , v = 0;
            u.tabs({
                active: a ? 1 : 0,
                activate: function() {
                    var n = u.tabs("option", "active");
                    n == 0 ? (h.removeClass("hide-pane"),
                    o.addClass("activityActive")) : v == 0 && (h.addClass("hide-pane"),
                    o.removeClass("activityActive"));
                    v = n
                }
            });
            a ? l() : c();
            s.resize(function() {
                var n = s.width();
                n <= t ? f > t && c() : (f <= t && l(),
                Actions.Log());
                f = n
            });
            $(".lesson-pane-trigger").attr("tabindex", "0");
            $(".lesson-pane-trigger").bind("keydown", function(n) {
                n.keyCode === 13 && $(this).click()
            });
            $(".lesson-pane-trigger").on("click", function() {
                $(".lesson-pane").css("right") == "0px" ? ($(".lesson-pane > div > ul > li").prop("tabindex", "-1"),
                $(".notepad-form-advanced").prop("tabindex", "-1"),
                $(".icon-expand1").prop("tabindex", "-1"),
                $(".icon-shrink1").prop("tabindex", "-1")) : ($(".lesson-pane > div > ul > li").prop("tabindex", "0"),
                $(".notepad-form-advanced").prop("tabindex", "0"),
                $(".icon-expand1").css("display") == "inline-block" ? $(".icon-expand1").prop("tabindex", "0") : $(".icon-shrink1").prop("tabindex", "0"))
            });
            return $(".lesson-pane a[role='presentation']").css("tabindex", "-1"),
            $(".lesson-pane > div > ul > li").bind("keydown", function() {
                event.keyCode === 13 && $(this).click()
            }),
            $(".lesson-pane > div > ul > li").bind("click", function() {
                $(".lesson-pane > div > ul > li").prop("tabindex", "0")
            }),
            $("#advancedIcon i").bind("keydown", function(n) {
                n.keyCode === 13 && $(this).click()
            }),
            $("#advancedIcon i").bind("click", function() {
                $(this).hasClass("icon-shrink1") ? ($(".icon-shrink1").prop("tabindex", "0"),
                $(".icon-expand1").prop("tabindex", "-1")) : ($(".icon-shrink1").prop("tabindex", "-1"),
                $(".icon-expand1").prop("tabindex", "0"))
            }),
            $(".notepad-form-advanced").bind("keydown", function(n) {
                n.keyCode === 13 && $(this).click()
            }),
            $(".notepad-form-advanced").bind("click", function() {
                $(this).attr("id") == "notepad-form-hide-advanced" ? ($("#notepad-form-show-advanced").prop("tabindex", "0"),
                $("#notepad-form-hide-advanced").prop("tabindex", "-1")) : ($("#notepad-form-show-advanced").prop("tabindex", "-1"),
                $("#notepad-form-hide-advanced").prop("tabindex", "0"))
            }),
            {
                element: u,
                active: r
            }
        }(".uitabs", 1099);
        iFrameNotify.listen("turnOffLeavePage", function() {
            window.onbeforeunload = null
        });
        iFrameNotify.listen("TimeAssessmentLeavePage", function() {
            window.onbeforeunload = null
        });
        window.onbeforeunload = null;
        r = new PendoHandler;
        r.init(initialization.InitialLaunchData.UserID, initialization.InitialLaunchData.SchoolID)
    })
}),
function(n) {
    (function(t, i, r, u, f) {
        var e, o, c, s, h;
        for (f = t[u] = t[u] || {},
        f._q = f._q || [],
        e = ["initialize", "identify", "updateOptions", "pageLoad", "track"],
        o = 0,
        c = e.length; o < c; ++o)
            (function(n) {
                f[n] = f[n] || function() {
                    f._q[n === e[0] ? "unshift" : "push"]([n].concat([].slice.call(arguments, 0)))
                }
            }
            )(e[o]);
        s = i.createElement(r);
        s.async = !0;
        s.src = "https://cdn.pendo.io/agent/static/" + n + "/pendo.js";
        h = i.getElementsByTagName(r)[0];
        h.parentNode.insertBefore(s, h)
    }
    )(window, document, "script", "pendo")
}("59f3af81-10f5-4d04-71aa-8df9b9c51deb");
PendoHandler = function() {
    var n = this;
    n.init = function(t, i) {
        n.storageKey = t + "_" + i;
        let r = n.fetchMetaDataFromStorage();
        r ? pendo.initialize(r) : n.getMetaData(n.getMetaDataSuccess, n.fail)
    }
    ;
    n.getMetaData = function(n, t) {
        let i = "https://" + window.location.hostname + "/lmsapi/api/pendo/metadata";
        return $.ajax({
            url: i,
            cache: !1,
            success: n,
            error: t
        })
    }
    ;
    n.getMetaDataSuccess = function(t) {
        n.storeMetaData(t);
        pendo.initialize(t);
        pendo.validateInstall()
    }
    ;
    n.fail = function(n) {
        console.log(n)
    }
    ;
    n.fetchMetaDataFromStorage = function() {
        let t = sessionStorage.getItem(n.storageKey);
        return JSON.parse(t)
    }
    ;
    n.storeMetaData = function(t) {
        let i = JSON.stringify(t);
        sessionStorage.setItem(n.storageKey, i)
    }
}
