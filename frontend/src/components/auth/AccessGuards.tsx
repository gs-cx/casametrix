import React from "react";

/**
 * Garde d'accès Casametrix.
 *
 * Pour l'instant, ces composants se contentent de rendre les children.
 * Ils pourront être reliés plus tard au vrai contexte d'authentification.
 */

type GuardProps = {
  children: React.ReactNode;
};

export const RequireAuth: React.FC<GuardProps> = ({ children }) => {
  // TODO: brancher sur le contexte d'auth / redirection login
  return <>{children}</>;
};

export const RequirePublic: React.FC<GuardProps> = ({ children }) => {
  // TODO: si utilisateur connecté, rediriger vers /search ou /dashboard
  return <>{children}</>;
};

export const RequireAdmin: React.FC<GuardProps> = ({ children }) => {
  // TODO: vérifier rôle admin, sinon rediriger
  return <>{children}</>;
};
