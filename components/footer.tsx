import SocialLinks from './social-links'
import { ThemeSwitcher } from './theme-switcher'

export default function Footer () {
  return (
    <footer className="pt-0 mb-12 w-full mx-auto flex flex-col gap-6 md:max-w-4xl">
      <section id="footer" className="flex flex-col p-8 gap-6 rounded-2xl overflow-hidden bg-neutral-200/30 border dark:bg-neutral-900/50  animate-pulse-fade-in animate-delay-500 animate-duration-600">
        <div className="flex justify-between">
          <SocialLinks />
          <ThemeSwitcher />
        </div>
      </section>
    </footer>
  )
}
