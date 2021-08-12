import './page.css';
import { createHeader } from './Header';
import { createBeePlugin } from './BeePlugin';

export interface PageProps {
  user?: null;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const createPage = ({ user, onLogout, onLogin, onCreateAccount }: PageProps) => {
  const article = document.createElement('article')

  const header = createHeader({ onLogin, onLogout, onCreateAccount, user })
  article.appendChild(header);

  const section = document.createElement('section')

  const plugin = createBeePlugin()

  section.appendChild(plugin)

  article.appendChild(section)

  return article;
};
