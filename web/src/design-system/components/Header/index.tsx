"use client";

import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import {
  headerAvatarInnerVariants,
  headerAvatarVariants,
  headerRootVariants,
  type HeaderRootVariants,
} from "./Header.variants";

type HeaderProps = HTMLAttributes<HTMLElement> &
  HeaderRootVariants & {
    /** Texto principal (ex.: "Bem vindo, Alisson"). */
    title: ReactNode;
    /** Subtítulo opcional, exibido acima do título (ex.: data). */
    eyebrow?: ReactNode;
    /** Ícone exibido dentro do avatar à esquerda. */
    avatarIcon: ReactNode;
    /** Acessibilidade do botão do avatar. */
    avatarLabel?: string;
    /** Callback ao clicar no avatar (ex.: abrir menu). Sem callback, é renderizado como `div`. */
    onAvatarClick?: () => void;
    /** Estado de loading do avatar (ex.: logout em andamento). */
    avatarLoading?: boolean;
    /** Conteúdo à direita: pill de saldo, badge de status, botões etc. */
    trailing?: ReactNode;
    ref?: Ref<HTMLElement>;
  };

export const Header = ({
  className,
  density,
  title,
  eyebrow,
  avatarIcon,
  avatarLabel = "Abrir menu da conta",
  onAvatarClick,
  avatarLoading = false,
  trailing,
  ref,
  ...props
}: HeaderProps) => {
  const isAvatarInteractive = Boolean(onAvatarClick);

  return (
    <header
      ref={ref}
      className={cn(headerRootVariants({ density }), className)}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3">
        {isAvatarInteractive ? (
          <button
            type="button"
            onClick={onAvatarClick}
            aria-label={avatarLabel}
            disabled={avatarLoading}
            className={headerAvatarVariants()}
          >
            <span className={headerAvatarInnerVariants()} aria-hidden="true">
              {avatarIcon}
            </span>
          </button>
        ) : (
          <div className={headerAvatarVariants()} aria-hidden="true">
            <span className={headerAvatarInnerVariants()}>{avatarIcon}</span>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-0.5">
          {eyebrow ? (
            <span className="text-xs font-medium text-text-subtle">
              {eyebrow}
            </span>
          ) : null}
          <span className="truncate text-md font-semibold tracking-tight text-text">
            {title}
          </span>
        </div>
      </div>

      {trailing ? (
        <div className="flex items-center gap-2">{trailing}</div>
      ) : null}
    </header>
  );
};

export type { HeaderProps };
