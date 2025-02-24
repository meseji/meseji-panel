import LanguageSwitcher from '@/components/marketing/layout/language-switcher';
import { useTranslations } from 'next-intl';
 
export default function Page() {
  const t = useTranslations('auth.login');
 
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('description')}</button>
      <LanguageSwitcher/>
    </div>
  );
}