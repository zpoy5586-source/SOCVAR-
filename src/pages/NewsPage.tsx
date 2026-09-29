import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  BookOpen, 
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewsPage: React.FC = () => {
  const { news, selectedArticle, setSelectedArticle, navigateTo } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Clinical Tech', 'Patient Stories', 'Rehabilitation', 'Company News'];

  const filteredNews = news.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* News Banner */}
      <div className="rounded-3xl bg-slate-900 border-2 border-red-500/40 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-red-600/20 border border-red-500/40 text-xs text-red-300 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-red-400" />
            <span>Clinical Research, Tech Insights & Patient Spotlights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            News, Breakthroughs & Community
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Stay updated with clinical discoveries in neural prosthetic interfaces, gait retraining biomechanics, amputee athletic milestones, and our global humanitarian fittings.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Featured / Hero Article */}
      {filteredNews.length > 0 && categoryFilter === 'all' && !searchQuery && (
        <div
          onClick={() => setSelectedArticle(filteredNews[0])}
          className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer group hover:border-blue-500/50 transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 relative min-h-[300px] overflow-hidden">
            <img
              src={filteredNews[0].image}
              alt={filteredNews[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded bg-blue-600 text-white shadow-md">
              Featured Research
            </span>
          </div>
          <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{filteredNews[0].date}</span>
                <span>•</span>
                <span>{filteredNews[0].readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-heading group-hover:text-blue-400 transition-colors">
                {filteredNews[0].title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {filteredNews[0].summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">{filteredNews[0].author}</div>
                <div className="text-[10px] text-slate-400">{filteredNews[0].authorRole}</div>
              </div>
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Full Story</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer group hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-slate-200 border border-slate-700 backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{article.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-bold text-white text-base font-heading group-hover:text-blue-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                By {article.author}
              </div>
              <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                Read →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ARTICLE FULL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 uppercase">
                {selectedArticle.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
                <span>By <strong>{selectedArticle.author}</strong> ({selectedArticle.authorRole})</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video border border-slate-800">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  navigateTo('registration');
                }}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors"
              >
                Register for Clinical Consultation
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
