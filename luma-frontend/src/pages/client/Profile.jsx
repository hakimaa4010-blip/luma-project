import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/axiosInstance';
import { User, Phone, Mail, Calendar, Edit, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user, token } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (token) {
      api.get('/client/profile')
        .then(res => {
          setProfile(res.data);
          setName(res.data.name);
          setPhone(res.data.phone || '');
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMsg('');
    try {
      const res = await api.put('/client/profile', { name, phone });
      setProfile(res.data);
      setIsEditing(false);
      setSuccessMsg('Votre profil a été mis à jour avec succès.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-[#1A1A1A]">Mon Profil</h1>
        <p className="text-xs text-gray-400 mt-1">Gérez vos informations personnelles et vos préférences de contact.</p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-emerald-50 border-l-2 border-emerald-500 p-4 rounded text-xs text-emerald-800 tracking-wide">
          <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Profile Box */}
      <div className="bg-[#FCFCFA] rounded-2xl p-6 md:p-8 border border-[#F3F2EE] shadow-sm">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#C8956C] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {profile?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-medium text-stone-900">{profile?.name}</h2>
                <p className="text-xs tracking-wider text-[#C8956C] font-semibold uppercase mt-0.5">Membre Privé</p>
              </div>
            </div>

            <div className="h-[1px] bg-stone-100 my-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-3 text-stone-600">
                <Mail className="text-stone-400 flex-shrink-0" size={18} />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Email</span>
                  <span className="font-medium text-stone-900">{profile?.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-stone-600">
                <Phone className="text-stone-400 flex-shrink-0" size={18} />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Téléphone</span>
                  <span className="font-medium text-stone-900">{profile?.phone || 'Non renseigné'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-stone-600">
                <Calendar className="text-stone-400 flex-shrink-0" size={18} />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Inscrit depuis le</span>
                  <span className="font-medium text-stone-900">
                    {new Date(profile?.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 flex items-center justify-center px-6 py-3 bg-[#1A1A1A] hover:bg-[#C8956C] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md"
            >
              <Edit size={14} className="mr-2" />
              Modifier mon profil
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <h2 className="text-base font-semibold text-stone-850">Modifier mes informations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Nom complet</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-stone-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#C8956C] transition-colors bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Téléphone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +212611223344"
                  className="w-full border border-stone-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#C8956C] transition-colors bg-white"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C8956C] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md"
              >
                {updating ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}