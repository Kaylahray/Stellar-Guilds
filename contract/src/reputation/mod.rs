use alloc::format;
use soroban_sdk::{Env, String};

pub mod scoring;
pub mod storage;
pub mod types;

pub use scoring::{
    compute_governance_weight, get_decayed_profile, get_global_reputation, record_contribution,
};

pub use storage::{get_badges, get_contributions};

pub use types::{Badge, BadgeType, ContributionRecord, ContributionType, ReputationProfile};

pub fn get_token_metadata(env: &Env, id: u64) -> String {
    let rank = match id % 3 {
        0 => "Master",
        1 => "Captain",
        _ => "Scout",
    };
    let json = format!(
        "{{\"name\":\"Stellar Hero #{}\",\"rank\":\"{}\",\"image\":\"ipfs://stellar-hero-{}\"}}",
        id, rank, id
    );
    String::from_str(env, &json)
}

#[cfg(test)]
mod tests;
